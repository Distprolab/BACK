const { Request, Response } = require("express");

const Roles = require("../models/role");
const { Op } = require("sequelize");
const Modelo = require("../models/modelo");
const Equipos = require("../models/equipos");
const Analizador = require("../models/analizador");

const consultamodelo = async (req, res) => {
	const modelo = await Modelo.findAll({
		include:{
			model:Analizador,
			as:"instrumento"
		} 
	});
	res.json({ ok: true, modelo });
};

const GetIDmodelo = async (req, res) => {
	res.json({ usuarios });
};

const postmodelo = async (req, res) => {
	const { NOMBRE } = req.body;

	const modelos = new Modelo({ NOMBRE });
	const modelo = await Modelo.findOne({
		where: {
			NOMBRE: modelos.NOMBRE,
		},
	});

	console.log(modelo);

	if (modelo) {
		return res.status(400).json({
			msg: "La categoria ya existe ",
		});
	}

	await modelos.save();
	res.status(201).json({ msg: "Se registro con exito la categoria" });
};

const modeloUpdate = async (req, res) => {
	const { id, NOMBRE } = req.body;
	const modeloBD = await Modelo.findByPk(id);
	if (!modeloBD) {
		return res.status(404).json({
			ok: false,
			msg: `No existe el modelo ingresado`,
		});
	}
	await Modelo.update(
		{
			NOMBRE,
		},
		{ where: { id: id } }
	);

	res
		.status(200)
		.json({
			ok: true,
			msg: `El modelo ${NOMBRE}a sido actualizado con exito..`,
		});
};

const modeloDelete = async (req, res) => {
	const { id } = req.params;
	const modelo = await Modelo.findByPk(id);

	if (!modelo) {
		return res
			.status(404)
			.json({ ok: false, msg: `El modelo ingresado no existe` });
	}
	await modelo.update({ ESTADO: 0 });
	res.status(200).json({
		msg: `El modelo ${modelo.NOMBRE} a sido desactivado con exito...`,
	});
};

module.exports = {
	modeloDelete,
	modeloUpdate,
	consultamodelo,
	postmodelo,
	GetIDmodelo,
};
