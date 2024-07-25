const { Request, Response } = require("express");

const Roles = require("../models/role");
const { Op, where } = require("sequelize");
const Contrato = require("../models/contrato");
const validator = require("ecuador-validator");
const consultaCotizacion = async (req, res) => {
	const contrato = await Contrato.findAll({});

	res.json({ ok: true, contrato });
};

const GetIDCotizacion = async (req, res) => {
	res.json({ usuarios });
};

const postCotizacion = async (req, res) => {

	const file= req.file;
	console.log(`------>`,req.body)

	const {RUC}=req.body;


//console.log(ruc)
/* 	const {
		razonsocial,
		ruc,
		correo,
		modalidad,
		EQUIPO_ID,
		estadistica,
		carga,
		comentarios,
	} = req.body; */

	/* const contratos = new Contrato({
		razonsocial,
		ruc,
		correo,
		modalidad,
		EQUIPO_ID,
		estadistica,
		carga,
		comentarios,
	});

	const contrat = await Contrato.findOne({
		where: {
			ruc: contratos.ruc,
		},
	});

	console.log(contrat);

	if (contrat) {
		return res.status(400).json({
			msg: "El ruc  ya existe",
		});
	}

	await contratos.save(); */
	res.status(201).json({ msg: "l acotizacion a sido registrado con exito" });
};

const UpdateCotizacion = async (req, res) => {
	res.send("update guardada con exito..");
};

const DeleteCotizacion = async (req, res) => {
	const id = req.params.id;
	const { NOMBRE } = req.body;
	const contrato = await Contrato.findByPk(id);
	if (!contrato) {
		return res.status(404).json({
			msg: "El contrato  no existe...",
		});
	}
	await contrato.update({
		ESTADO: 0,
	});

	res.status(200).json({
		msg: `El nombre ${NOMBRE} a sido desactivado con exito...`,
	});
};

module.exports = {
	DeleteCotizacion,
	UpdateCotizacion,
	consultaCotizacion,
	postCotizacion,
	GetIDCotizacion,
};
