const { Request, Response } = require("express");

const Roles = require("../models/role");
const { Op, where } = require("sequelize");
const ubicacion = require("../models/ubicacion");
const Ubicacion = require("../models/ubicacion");

const consultaubicacion = async (req, res) => {
	const ubicacion = await Ubicacion.findAll({
		/* where: {
				rol: {
					[Op.ne]: "ADMIN",
				},
			}, */
	});

	res.json({ ok: true, ubicacion });
};

const GetIDubicacion = async (req, res) => {
	res.json({ usuarios });
};

const postubicacion = async (req, res) => {
	const { NOMBRE } = req.body;

	const ubicacions = new Ubicacion({ NOMBRE });
	const ubicacion = await Ubicacion.findOne({
		where: {
			NOMBRE: NOMBRE,
		},
	});

	console.log(ubicacion);

	if (ubicacion) {
		return res.status(400).json({
			msg: "Este ubicacion ya existe",
		});
	}

	await ubicacions.save();
	res.status(201).json({ msg: "El ubicacion  a sido registrado con exito" });
};

const ubicacionUpdate = async (req, res) => {
	res.send("update guardada con exito..");
};

const ubicacionDelete = async (req, res) => {
	const id = req.params.id;
	const { NOMBRE } = req.body;
	const ubicacion = await ubicacion.findByPk(id);
	if (!ubicacion) {
		return res.status(404).json({
			msg: "El ubicacion  no existe...",
		});
	}
	await ubicacion.update({
		ESTADO:0 }
	);

	res.status(200).json({
		msg: `El nombre ${NOMBRE} a sido desactivado con exito...`,
	});
};

module.exports = {
	ubicacionDelete,
	ubicacionUpdate,
	consultaubicacion,
	postubicacion,
	GetIDubicacion,
};
