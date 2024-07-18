const { Request, Response } = require("express");

const Equipos = require("../models/equipos");
const Modelo = require("../models/modelo");
const Marca = require("../models/marca");
const Ubicacion = require("../models/ubicacion");
const Estado = require("../models/estado");
const Accesorio = require("../models/accesorio");
const Analizador = require("../models/analizador");

const getAnalizador = async (req, res) => {
	const analizador = await Analizador.findAll({
		include: [
			{
				model: Modelo,
				as: "modelo",
			},
		],
		/* include:[
			{
				model: Modelo,
				as:"modelo"
			},
			{
				model: Marca,
				as:"marca"
			},
			{
				model: Ubicacion,
				as:"ubicacion"
			},
			{
				model: Estado,
				as:"estado"
			},
			{
				model: Accesorio,
				as:"acc"
			},
		] */
	});

	res.json({ ok: true, analizador });
};

const createAnalizador = async (req, res) => {
	console.log(req.body);
	const { NOMBRE, modeloId } = req.body;

	const nuevoAnalizador = new Analizador({
		NOMBRE,
		modeloId,
	});
	await nuevoAnalizador.save();

	return res.status(201).json({
		ok: true,
		msg: `El analizador ${NOMBRE} ha  registrado con exito`,
	});
};

const updateAnalizador = async (req, res) => {
	res.send("update guardada con exito..");
};

const deleteAnalizador = async (req, res) => {
	const { id } = req.params;
	const analizador = await Analizador.findByPk(id);
	if (!analizador) {
		return res.status(404).json({
			msg: `No existe el analizador con el ${id}`,
		});
	}

	await analizador.update({ ESTADO: 0 });

	res.status(200).json({
		msg: "El analizador a sido desactivado con exito...",
	});
};

module.exports = {
	createAnalizador,
	updateAnalizador,
	deleteAnalizador,
	getAnalizador,
};
