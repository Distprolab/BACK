const { Request, Response } = require("express");

const Equipos = require("../models/equipos");
const Modelo = require("../models/modelo");
const Marca = require("../models/marca");
const Ubicacion = require("../models/ubicacion");
const Estado = require("../models/estado");
const Accesorio = require("../models/accesorio");


const getEquipos = async (req, res) => {
	const equipos = await Equipos.findAll({
		include:[
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
		]

		
		
	});

	res.json({ ok: true, equipos: equipos });
};

const createEquipos = async (req, res) => {
	console.log(req.body)
	const { NOMBRE, CATEGORIA,MARCA_ID,ESTADO_ID,UBICACION_ID,MODELO_ID ,SERIE,ACC} = req.body;

const t = await Equipos.sequelize.transaction();

  try {
    // Verifica si la serie ya existe
    const serieExiste = await Equipos.findOne({
      where: { SERIE: SERIE },
      transaction: t
    });

    if (serieExiste) {
      await t.rollback();
      return res.status(200).json({ ok: false, msg: `La serie ${SERIE} ya existe` });
    }


    const nuevoEquipo = await Equipos.create({
      NOMBRE,
      modeloId: CATEGORIA,
      marcaId: MARCA_ID,
      estadoId: ESTADO_ID,
      ubicacionId: UBICACION_ID,
      SERIE
    }, { transaction: t });

 
    for (const accesorio of ACC) {
      accesorio.equipoId = nuevoEquipo.id; // Asocia el accesorio con el equipo
    }

    await Accesorio.bulkCreate(ACC, { transaction: t });

    // Confirma la transacción
    await t.commit();
		return res.status(201).json({ ok:true,msg: `El equipo ${NOMBRE} ha  registrado con exito` });
  
  } catch (error) {
    // Rechaza la transacción en caso de error
    await t.rollback();
    return res.status(500).json({ ok: false, msg: 'Error al crear el equipo', error });
  }
	
};

const updateEquipos = async (req, res) => {
	res.send("update guardada con exito..");
};

const deleteEquipos = async (req, res) => {

const {id}=req.params;
const equipo = await Equipos.findByPk(id);
if (!equipo) {
	return res.status(404).json({
		msg: `No existe el equipo con el id ${id}`,
	});
}

await equipo.update({ESTADO:0})

	res.status(200).json({
		msg: "El equipo a sido desactivado con exito...",
	});
};

module.exports = {
	createEquipos,
	updateEquipos,
	deleteEquipos,
	getEquipos,
};
