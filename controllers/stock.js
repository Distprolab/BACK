const { Request, Response } = require("express");
const { Op, and, Sequelize, fn, col } = require("sequelize");
const Usuario = require("../models/usuarios");
const { sequelize } = require("../models/stock");
const { Fn } = require("sequelize/lib/utils");
const Stock = require("../models/stock");
const ItemStock = require("../models/itemStock");

const getStock = async (req, res) => {
	const allStock = await ItemStock.findAll({
		attributes: [
			[sequelize.fn("SUM", sequelize.col("CANTIDAD")), "cantidad"],
			"referencia",
			"lote",
			"caducidad",
		],
		group: ["referencia", "lote", "caducidad"],
	});

	res.status(200).json({
		ok: true,
		stock: allStock,
	});
};

const getAllStock = async (req, res) => {
	const { FECHADESDE, FECHAHASTA } = req.query;
	try {
		const filtro = await ItemStock.findAll({
			where: {
				ESTADO: 1,
				fecha: {
					[Op.between]: [FECHADESDE, FECHAHASTA],
				},
			},
			attributes: [[fn("SUM", col("CANTIDAD")), "Total"], "productId"],
			group: ["productId"],
			include: [
				{
					model: Producto,
					as: "product",
				},
			],
		});

		await sequelize.transaction(async (t) => {
			const Stocks = await Stock.findAll({
				where: {
					ESTADO: 1,
					FECHAStock: {
						[Op.between]: [FECHADESDE, FECHAHASTA],
					},
				},
				include: ["items"],
			});

			if (Stocks.length == 0) {
				throw new Error("El rango seleccionado no tiene Informacion");
			}

			await Promise.all(
				Stocks.map(async (Stock) => {
					await Stock.update(
						{
							ESTADO: 2,
						},
						{ where: { id: Stock.id }, transaction: t }
					);

					await Promise.all(
						Stock.items.map(async (item) => {
							await ItemStock.update(
								{
									ESTADO: 2,
								},
								{
									where: {
										StockId: item.StockId,
									},
									transaction: t,
								}
							);
						})
					);
				})
			);
		});
		res.status(200).json({
			ok: true,
			filtro: filtro,
		});
	} catch (error) {
		console.error("Error en la transacción:", error);
		res.status(500).json({
			ok: false,
			msg: "El rango seleccionado no tiene Informacion",
		});
	}
};
const getBusquedaStock = async (req, res) => {
	const { termino } = req.params;

	const dataCA = termino.replace(/\w\S*/g, function (e) {
		return e.charAt(0).toUpperCase() + e.substring(1);
	});
	const busquedaStock = await ItemStock.findAll({
		where: {
			referencia: {
				[Op.like]: `%${dataCA}%`,
			},
		},
	});

	res.status(200).json({ ok: true, resultados: busquedaStock });
};
const getFiltroStock = async (req, res) => {
	const { id } = req.params;

	const Stock = await Stock.findByPk(id, {
		attributes: ["id", "ID_PROVEEDOR", "MARCA"],
		include: [
			{
				model: ItemStock,
				as: "items",
				//attributes:["ID_PROVEEDOR","MARCA"]
				attributes: ["ID_PRODUCTO", "CANTIDAD"],
				include: {
					model: Producto,
					as: "product",
					attributes: { exclude: ["createdAt", "updatedAt", "ESTADO"] },
				},
			},
		],
	});
	res.status(200).json({ ok: true, Stock: Stock });
};

const createStock = async (req, res) => {
	const idUser = req.usuario;
	const { guia, productos } = req.body;
	console.log(productos);

	await sequelize.transaction(async (t) => {
		const stocks = await Stock.create(
			{
				guia: guia,

				usuario: idUser.id,
				//userId: idUser.id,
			},
			{ transaction: t }
		);

		const itemStocks = await Promise.all(
			productos.map(async (producto) => {
				const productoId = producto.id;
				console.log(productoId);
				return await ItemStock.create(
					{
						referencia: producto.referencia,
						lote: producto.lote,
						caducidad: producto.caducidad,
						cantidad: producto.cantidad,
						cantidad_recibida: producto.cantidad_recibida,
						fabricante: producto.fabricante,
						sanitario: producto.sanitario,
					},
					{ transaction: t }
				);
			})
		);

		await stocks.setStockItem(itemStocks, { transaction: t });
	});

	res.status(201).json({
		msg: "El Stock a sido registrado con exito",
	});
};

const updateStock = async (req, res) => {
	const id = req.body.id;
	const { ID_PROVEEDOR, MARCA, PRODUCTOS } = req.body;
	await sequelize.transaction(async (t) => {
		try {
			const Stock = await Stock.findByPk(id);
			if (!Stock) {
				throw new Error("No se encontró el Stock ");
			}

			await Stock.update(
				{ ID_PROVEEDOR, MARCA },
				{ where: { id: id }, transaction: t }
			);

			await Promise.all(
				PRODUCTOS.map(async (item) => {
					const { CANTIDAD } = item;
					await ItemStock.update(
						{
							CANTIDAD,
						},
						{
							where: {
								StockId: id,
							},
							transaction: t,
						}
					);
				})
			);
		} catch (error) {
			console.log(error);
		}
	});
	res.status(200).json({ ok: true, msg: `El Stock ${id} a sido actualizado` });
};

const deleteStock = async (req, res) => {
	const { id } = req.params;

	await sequelize.transaction(async (t) => {
		const idStock = await Stock.findByPk(id, {
			include: ["items"],
		});

		if (!idStock) {
			return res.status(404).json({
				ok: false,
				msg: `No existe el Stock ${id}`,
			});
		}

		await Stock.update(
			{
				ESTADO: 0,
			},
			{ where: { id: id }, transaction: t }
		);

		await Promise.all(
			idStock.items.map(async (item) => {
				const { ESTADO } = item;
				await ItemStock.update(
					{
						ESTADO: 0,
					},
					{
						where: {
							StockId: id,
						},
						transaction: t,
					}
				);
			})
		);
	});

	res.status(200).json({
		msg: "El Stock a sido desactivado con exito...",
	});
};

module.exports = {
	getStock,
	getFiltroStock,
	getBusquedaStock,
	getAllStock,
	createStock,
	updateStock,
	deleteStock,
};
