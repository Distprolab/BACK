const { Request, Response } = require("express");
const Impresora = require("../models/impresora");
const Panel_pruebas = require("../models/panelPruebas");
const Modelo = require("../models/modelo");

const getpanelPruebas = async (req, res) => {
	const listapruebas = await Panel_pruebas.findAll({
		
		include: {
			model:Modelo,
			as:"modelo"
		}
	}

);

	res.json({ ok: true, listapruebas });
};

const getIdpruebas = async (req, res) => {
	const { id } = req.params;

	console.log(id);

	const listapruebas = await Panel_pruebas.findByPk(id);
	if (!listapruebas) {
		return res
			.status(400)
			.json({ ok: false, msg: `La prueba con la ID ${id} no existe` });
	}
	res.status(200).json({ ok: true, listapruebas });
};
const createpanelPruebas = async (req, res) => {
	const { CODIGO, NOMBRE, modeloId, TIEMPO, VALOR } = req.body;
	const panelPruebas = new Panel_pruebas({
		CODIGO,
		NOMBRE,
		modeloId,
		TIEMPO,
		VALOR,
	});
	const panel = await Panel_pruebas.findOne({
		where: {
			CODIGO: CODIGO,
		},
	});

	if (panel) {
		return res.status(400).json({
			msg: "Este codigo de pruebas   ya existe",
		});
	}
	await panelPruebas.save();
	res.status(201).json({ msg: "La prueba  ha  registrado con exito" });
};

const updatepanelPruebas = async (req, res) => {
	const { id } = req.body;

	console.log(req.body);

	const listapruebas = await Panel_pruebas.findByPk(id);
	if (!listapruebas) {
		return res
			.status(400)
			.json({ ok: false, msg: `La prueba con la ID ${id} no existe` });
	}

	const { CODIGO, NOMBRE, modeloId, TIEMPO, VALOR ,favorite} = req.body;

if (!favorite) {
	await Panel_pruebas.update(
		{
			CODIGO,
			NOMBRE,
			modeloId,
			TIEMPO,
			VALOR,
		},
		{ where: { id: id } }
	);
	res
		.status(200)
		.json({ ok: true, msg: `Se actualizo la prueba ${NOMBRE} con exito` });
}else{

	await Panel_pruebas.update(
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

const deletepanelPruebas = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const prueba = await Panel_pruebas.findByPk(id);
	if (!prueba) {
		return res
			.status(400)
			.json({ ok: false, msg: `La prueba con la ID ${id} no existe` });
	}
	await prueba.update({ ESTADO: 0 });

	res.status(200).json({
		msg: "La prueba  a sido desactivado con exito...",
	});
};

module.exports = {
	createpanelPruebas,
	updatepanelPruebas,
	deletepanelPruebas,
	getIdpruebas,
	getpanelPruebas,
};
