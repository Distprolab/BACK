const Orden = require("../models/ordenes");
const Prueba = require("../models/pruebas");
const { Mutex } = require("async-mutex");
const { sequelize } = require("../models/ordenes");
const moment = require("moment");
const { Model } = require("sequelize");
const Diagnostico = require("../models/diagnostico");
const Tipoatencion = require("../models/Tipoatencion");
const Tiposervicio = require("../models/tiposervicio");
const Paciente = require("../models/paciente");
const Medico = require("../models/medico");
const Panel_pruebas = require("../models/panelPruebas");
const { includes } = require("lodash");
const Rango = require("../models/rangosreferencia");
const hisMutex = new Mutex();
const getIngresorden = async (req, res) => {
	const ordenes = await Orden.findAll({
		include: [
			 {
				model: Diagnostico,
				as: "diagnostico",
			},
			{
				model: Tipoatencion,
				as: "tipoatencion",
			},
			{
				model: Tiposervicio,
				as: "tiposervicio",
			}, 
			 {
				model: Prueba,
				as: "prueba",
				include:{
					model:Panel_pruebas,
					as:"panelprueba"
				}
			},  
			{
				model: Paciente,
				as: "paciente",
			}, 
			{
				model: Medico,
				as: "medico",
			}, 
		],
	});

	res.status(200).json({ ok: true, ordenes });
};

const getIdIngresorden = async (req, res) => {
const {id}= req.params;
	const ordenId = await Orden.findByPk(id,{
		include: [
			 {
				model: Diagnostico,
				as: "diagnostico",
			},
			{
				model: Tipoatencion,
				as: "tipoatencion",
			},
			{
				model: Tiposervicio,
				as: "tiposervicio",
			}, 
			 {
				model: Prueba,
				as: "prueba",
				include:{
					model:Panel_pruebas,
					as:"panelprueba",
					include:{
						model:Rango,
						as:"rango"
					}
				}
			},  
			{
				model: Paciente,
				as: "paciente",
			}, 
			{
				model: Medico,
				as: "medico",
			}, 
		],
	});

	res.status(200).json({ ok: true, ordenId });

};
const postIngresorden = async (req, res) => {
	const user = req.usuario;

	/* moment.locale("es");
	const hoy = moment();
	const fecha = hoy.format().slice(2, 10).replaceAll("-", "");
	const fechaH = hoy.format().slice(0, 10).replaceAll("-", "");
	console.log(`fechaaaaa`, fecha);
	const fechaT = hoy.format("L").split("/");
	const fechaToma = fechaT[2] + "-" + fechaT[1] + "-" + fechaT[0];
	const horaToma = hoy.format("LTS"); */
	let Norden = 0;

	const releaseHisMutex = await hisMutex.acquire();
	try {
		const numeroOrdenBD = await Orden.findAll({
			attributes: ["numeroorden"],
			limit: 1,
			order: [["numeroorden", "DESC"]],
		});
		console.log(numeroOrdenBD);
		/* if (numeroOrdenBD ) {
			let numero = parseInt(
				`${numeroOrdenBD[0].dataValues.numeroorden}`.slice(-4)
			);

			const rest =
				fecha - `${numeroOrdenBD[0].dataValues.numeroroden}`.slice(0, 6);
			if (isNaN(numero) || rest > 0) {
				let num = 0;
				Norden = `${num + 1}`.padStart(4, "0");
			} else {
				Norden = `${numero + 1}`.padStart(4, "0");
			}
		} else {
			let num = 0;
				Norden = `${num + 1}`.padStart(4, "0");
		} */

		await sequelize.transaction(async (t) => {
			const {
				pacienteId,

				tipoatencionId,
				tiposervicioId,
				medicoId,
				embarazada,
				fum,
				diagnosticoId,
				observaciones,
				pruebas,
				//usuarioId = user.id,
			} = req.body;

			console.log("AGREGANDO ID5", req.body);

			const ordenes = await Orden.create(
				{
					pacienteId,
					numeroorden: Norden,
					tipoatencionId,
					tiposervicioId,
					medicoId,
					embarazada,
					fum: fum && moment(fum).isValid() ? fum : null,
					diagnosticoId,
					observaciones,
					usuarioId: user.id,
				},
				{ transaction: t }
			);
			const prueba = await Promise.all(
				pruebas.map(async (item) => {
					return await Prueba.create(
						{
							panelpruebaId: item.codigoId,
							//ordenId: id,
						},
						{ transaction: t }
					);
				})
			);
			await ordenes.setPrueba(prueba, { transaction: t });
			/* const createdDetails = await Prueba.bulkCreate(req.body.pruebas, {
				transaction: t,
			});

			await ordenes.setOrden(createdDetails, { transaction: t }); */

			res.status(201).json({
				msg: `Se a integrado  la orden # ${req.body} para el paciente ${req.body.APELLIDO} ${req.body.NOMBRES} `,
			});
		});
	} catch (error) {
		console.log(`*****************ERROR*************`, error);
	} finally {
		releaseHisMutex();
	}
};
const updateIngresorden = (req, res) => {};
const deleteIngresorden = (req, res) => {};

module.exports = {
	getIngresorden,
	getIdIngresorden,
	postIngresorden,
	updateIngresorden,
	deleteIngresorden,
};
