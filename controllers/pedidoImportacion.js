const { Request, Response } = require("express");
const Pedido = require("../models/pedido");
const Producto = require("../models/productos");
const { Op, and, Sequelize, fn, col } = require("sequelize");

const Usuario = require("../models/usuarios");
const Itempedido = require("../models/itemPedido");
const { sequelize } = require("../models/pedido");
const Cliente = require("../models/cliente");
const Marca = require("../models/marca");
const { Fn } = require("sequelize/lib/utils");
const getPedido = async (req, res) => {
	const allPedido = await Pedido.findAll({
		where: {
			ESTADO: [1,2],
		},
		include: [
			{
				model: Itempedido,
				as: "items",
				attributes: ["ID_PRODUCTO", "CANTIDAD"],
				include: [{ model: Producto, as: "product", attributes: ["NOMBRE"] }],
			},
			{
				model: Usuario,
				as: "user",
				attributes: ["doctor"],
			},
			{ model: Cliente, as: "clientes", attributes: ["NOMBRE"] },
			{ model: Marca, as: "marcas", attributes: ["NOMBRE"] },
		],
	});
	res.status(200).json({
		ok: true,
		pedido: allPedido,
	});
};
const getAllPedido = async (req, res) => {
	const { FECHADESDE, FECHAHASTA } = req.query;
	try {
		const filtro = await Itempedido.findAll({
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
			const pedidos = await Pedido.findAll({
				where: {
					ESTADO: 1,
					FECHAPEDIDO: {
						[Op.between]: [FECHADESDE, FECHAHASTA],
					},
				},
				include: ["items"],
			});
			console.log(`ID`, pedidos.length);
			if (pedidos.length == 0) {
				throw new Error("El rango seleccionado no tiene Informacion");

			}

			await Promise.all(
				pedidos.map(async (pedido) => {
					await Pedido.update(
						{
							ESTADO: 2,
						},
						{ where: { id: pedido.id }, transaction: t }
					);

					await Promise.all(
						pedido.items.map(async (item) => {
							console.log(`ITEM`,item)
							await Itempedido.update(
								{
									ESTADO: 2,
								},
								{
									where: {
										pedidoId: item.pedidoId,
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

const getFiltroPedido = async (req, res) => {
	/* console.log( req.query)

	const { MARCA}=req.query
 */
	const data = await Pedido.findAll({
		where: {
			ID_PROVEEDOR: {
				[Op.like]: `%${dataCA}%`,
			},
		},
		include: [
			{
				model: Itempedido,
				as: "items",
				attributes: ["ID_PRODUCTO", "CANTIDAD"],
				include: [{ model: Producto, as: "product", attributes: ["NOMBRE"] }],
			},
			{
				model: Usuario,
				as: "user",
				attributes: ["doctor"],
			},
			{ model: Cliente, as: "clientes", attributes: ["NOMBRE"] },
			{ model: Marca, as: "marcas", attributes: ["NOMBRE"] },
		],
	});
	res.status(200).json({ ok: true, pedido: data });
};

const createPedido = async (req, res) => {
	const idUser = req.usuario;
	const { ID_PROVEEDOR, MARCA, PRODUCTOS } = req.body;
	console.log(req.body);
	await sequelize.transaction(async (t) => {
		const pedidos = await Pedido.create(
			{
				ID_PROVEEDOR,
				MARCA,
				usuarioId: idUser.id,
				userId: idUser.id,
				clientesId: ID_PROVEEDOR,
				marcasId: MARCA,
			},
			{ transaction: t }
		);

		const itempedidos = await Promise.all(
			PRODUCTOS.map(async (producto) => {
				const productoId = producto.id;
				console.log(productoId);
				return await Itempedido.create(
					{
						ID_PRODUCTO: producto.ID_PRODUCTO,
						CANTIDAD: producto.CANTIDAD,
						productId: producto.ID_PRODUCTO,
					},
					{ transaction: t }
				);
			})
		);

		await pedidos.setItems(itempedidos, { transaction: t });
	});

	res.status(201).json({
		msg: "El pedido a sido registrado con exito",
	});
};

const updatePedido = async (req, res) => {
	res.send("update guardada con exito..");
};

const deletePedido = async (req, res) => {
	const { id } = req.params;

	await sequelize.transaction(async (t) => {
		const idPedido = await Pedido.findByPk(id, {
			include: ["items"],
		});

		if (!idPedido) {
			return res.status(404).json({
				ok: false,
				msg: `No existe el pedido ${id}`,
			});
		}

		await Pedido.update(
			{
				ESTADO: 0,
			},
			{ where: { id: id }, transaction: t }
		);

		await Promise.all(
			idPedido.items.map(async (item) => {
				const { ESTADO } = item;
				await Itempedido.update(
					{
						ESTADO: 0,
					},
					{
						where: {
							pedidoId: id,
						},
						transaction: t,
					}
				);
			})
		);
	});

	res.status(200).json({
		msg: "El pedido a sido desactivado con exito...",
	});
};

module.exports = {
	getPedido,
	getFiltroPedido,
	getAllPedido,
	createPedido,
	updatePedido,
	deletePedido,
};
