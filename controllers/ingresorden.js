const Orden = require("../models/ordenes");
const Prueba = require("../models/pruebas");

const getIngresorden = (req, res) => {};

const getIdIngresorden = (req, res) => {};
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

		await sequelize.transaction(async (t) => {
			const {
				pacienteId,

				tipoatencion,
				servicioId,
				doctorId,
				embarazada,
				fum,
				diagnosticoId,
				observaciones,

				//usuarioId = user.id,
			} = req.body;

			console.log("AGREGANDO ID5", req.body);

			const ordenes = await Orden.create(
				{
					pacienteId,
					numeroorden: Norden,
					tipoatencion,
					servicioId,
					doctorId,
					embarazada,
					fum,
					diagnosticoId,
					observaciones,
					usuarioId: user.id,
				},
				{ transaction: t }
			);

			const createdDetails = await Prueba.bulkCreate(req.body.pruebas, {
				transaction: t,
			});

			await ordenes.setAs400(createdDetails, { transaction: t });

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
