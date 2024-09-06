const { Request, Response } = require("express");
const { sequelize } = require("../models/perfiles");
const Perfil = require("../models/perfiles");
const Itemprueba = require("../models/itemPruebas");
const Panel_pruebas = require("../models/panelPruebas");

const getPerfiles = async (req, res) => {
	const listaperfiles = await Perfil.findAll({
		include: {
			model: Itemprueba,
			as: "itempruebas",
			include: { model: Panel_pruebas, as: "panelprueba" },
		},
	});

	res.json({ ok: true, listaperfiles });
};

const getIdperfiles = async (req, res) => {
	const { id } = req.params;

	console.log(id);

	const listaperfiles = await Panel_pruebas.findByPk(id);
	if (!listaperfiles) {
		return res
			.status(400)
			.json({ ok: false, msg: `La prueba con la ID ${id} no existe` });
	}
	res.status(200).json({ ok: true, listaperfiles });
};
const createPerfiles = async (req, res) => {
	const { codigo, nombre, tipogrupoId, pruebas } = req.body;

	await sequelize.transaction(async (t) => {
		const perfil = await Perfil.create(
			{ codigo, nombre, tipogrupo: tipogrupoId },
			{ transaction: t }
		);
		
		const itempruebas = await Promise.all(
			pruebas.map(async (item) => {
				const pruebaId = item.pruebaId;
				return await Itemprueba.create(
					{
						//perfilId: pruebaId,
						panelpruebaId: pruebaId,
					},
					{ transaction: t }
				);
			})
		);
		

		await perfil.setItempruebas(itempruebas, { transaction: t });
	});
	res.status(201).json({ msg: "La prueba  ha  registrado con exito" });
};

const updatePerfiles = async (req, res) => {
	const { id } = req.body;

	console.log(req.body);

	const listaperfiles = await Perfil.findByPk(id);
	if (!listaperfiles) {
		return res
			.status(400)
			.json({ ok: false, msg: `La prueba con la ID ${id} no existe` });
	}

	const { CODIGO, NOMBRE, CATEGORIA, TIEMPO, VALOR, favorite } = req.body;

	if (!favorite) {
		await Perfil.update(
			{
				CODIGO,
				NOMBRE,
				CATEGORIA,
				TIEMPO,
				VALOR,
			},
			{ where: { id: id } }
		);
		res
			.status(200)
			.json({ ok: true, msg: `Se actualizo la prueba ${NOMBRE} con exito` });
	} else {
		await Perfil.update(
			{
				favorite,
			},
			{ where: { id: id } }
		);
		res
			.status(200)
			.json({ ok: true, msg: `Se actualizo la prueba ${NOMBRE} con exito` });
	}
};

const deletePerfiles = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const perfil = await Perfil.findByPk(id);
	if (!perfil) {
		return res
			.status(400)
			.json({ ok: false, msg: `La prueba con la ID ${id} no existe` });
	}
	await perfil.update({ estado: 0 });

	res.status(200).json({
		msg: "La prueba  a sido desactivado con exito...",
	});
};

module.exports = {
	createPerfiles,
	updatePerfiles,
	deletePerfiles,
	getIdperfiles,
	getPerfiles,
};
