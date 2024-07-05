const { Request, Response } = require("express");

const Roles = require("../models/role");
const { Op, where } = require("sequelize");
const estado = require("../models/estado");
const Estado = require("../models/estado");

const consultaestado = async (req, res) => {
	const estado = await Estado.findAll({
		/* where: {
				rol: {
					[Op.ne]: "ADMIN",
				},
			}, */
	});

	res.json({ ok: true, estado });
};

const GetIDestado = async (req, res) => {
	res.json({ usuarios });
};

const postestado = async (req, res) => {
	const { NOMBRE } = req.body;

	const estados = new Estado({ NOMBRE });
	const estado = await Estado.findOne({
		where: {
			NOMBRE: NOMBRE,
		},
	});

	console.log(estado);

	if (estado) {
		return res.status(400).json({
			msg: "Este estado ya existe",
		});
	}

	await estados.save();
	res.status(201).json({ msg: "El estado  a sido registrado con exito" });
};

const estadoUpdate = async (req, res) => {
	res.send("update guardada con exito..");
};

const estadoDelete = async (req, res) => {
	const id = req.params.id;
	const { NOMBRE } = req.body;
	const estado = await Estado.findByPk(id);
	if (!estado) {
		return res.status(404).json({
			msg: "El estado  no existe...",
		});
	}
	await estado.update({
		ESTADO:0 }
	);

	res.status(200).json({
		msg: `El nombre ${NOMBRE} a sido desactivado con exito...`,
	});
};

module.exports = {
	estadoDelete,
	estadoUpdate,
	consultaestado,
	postestado,
	GetIDestado,
};
