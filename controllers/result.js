const fs = require("fs");

const axios = require("axios").default;
const dataXX = require("../dataXX.json");
const serverBCK = require("../serverBCK.json");
const localStorage = require("localStorage");
const xml2js = require("xml2js");
const stripNS = require("xml2js").processors.stripPrefix;
const csvToJson = require("convert-csv-to-json");
const { loginInfinity } = require("../helpers/loginInfinity");
const { isArray, sample } = require("lodash");
const { numberToString } = require("pdf-lib");
const createresult = async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ ok: false, msg: `No existe archivo` });
	}

	let fileInputName = req.file.path;

	const jsonParse = fs.readFileSync(fileInputName, "utf8");
/* 	let json = csvToJson.getJsonFromCsv(fileInputName);
	res.json({json})
 */	const cleanjson = jsonParse.replace(/^.*\[\s*/, "[");
	const arrayjson = JSON.parse(cleanjson);
	const dat =
		arrayjson[
			
			"SELECT\r\n\tDISTINCT T01.IONUOR AS NUMERO_DE_ORDEN,\r\n\tT01.IOHIST AS HISTORIA_CLINICA,\r\n\t(CASE\r\n\t\tWHEN TRIM(T01.IOFECI)<8 THEN '00\/00\/0000'\r\n\t\tELSE VARCHAR_FORMAT(DATE(TIMESTAMP_FORMAT(CHAR(T01.IOFECI),\r\n\t\t'YYYYMMDD')),\r\n\t\t'DD\/MM\/YYYY')\r\n\tEND) AS FECHA_DE_CITA,\r\n\t(CASE\r\n\t\tWHEN TRIM(T01.IOFECI)<8 THEN '00\/00\/0000'\r\n\t\tELSE VARCHAR_FORMAT(DATE(TIMESTAMP_FORMAT(CHAR(T01.IOFECO),\r\n\t\t'YYYYMMDD')),\r\n\t\t'DD\/MM\/YYYY')\r\n\tEND) AS FECHA_DE_ORIGEN,\r\n\tT01.IOITEM AS NUMERO_DE_ITEM,\r\n\tTRIM(T03.ITODES) AS DESCRIPCION_DEL_PROCEDIMIENTO,\r\n\t(CASE\r\n\t\tWHEN TRIM(T01.IOXDAT)<8 THEN '00\/00\/0000'\r\n\t\tELSE VARCHAR_FORMAT(DATE(TIMESTAMP_FORMAT(CHAR(T01.IOXDAT),\r\n\t\t'YYYYMMDD')),\r\n\t\t'DD\/MM\/YYYY')\r\n\tEND) AS FECHA_DE_ACTUALIZACION,\r\n\t(TIME('00:00:00') + CAST((T01.IOXTIM * 100) AS DEC(6,\r\n\t0))) AS HORA_DE_ACTUALIZACION,\r\n\tT01.IOTISE AS TIPO_DE_SERVICIO,\r\n\tT01.IOSBTP AS SUBTIPO_DE_SERVICIO,\r\n\tT01.IOTPOR AS TIPO_DE_ORDEN,\r\n\tT03.ITODES AS TIPO_ORDEN_DESCRIPCION,\r\n\tT01.IOSTDE AS ESTADO_DE_DESPACHO,\r\n\tT02.IAFTAF AS TIPO_DE_AFILIACION,\r\n\tT01.IOXUSR AS CODIGO_DE_USUARIO,\r\n\tTRIM(T04.UPNAME) AS NOMBRE_DE_USUARIO,\r\n\tT05.IODEPE AS CODIGO_DE_DEPENDENCIA,\r\n\tTRIM(T06.ICDESA) AS DEPENDENCIA,\r\n\tT05.IOANXO AS CODIGO_DE_ANEXO,\r\n\tT01.IONUOR AS NUMERO_DE_ORDEN,\r\n\tT02.IAFCED AS NO_DOCUMENTO,\r\n\tTRIM(T02.IAFNOM) AS NOMBRES,\r\n\tT02.IAFSEX AS SEXO,\r\n\t(YEAR(NOW())-YEAR(T02.IAFFNA)) AS EDAD,\r\n\t(CASE\r\n\t\tWHEN TRIM(T02.IAFFNA)<8 THEN '00\/00\/0000'\r\n\t\tELSE VARCHAR_FORMAT(DATE(TIMESTAMP_FORMAT(CHAR(T02.IAFFNA),\r\n\t\t'YYYYMMDD')),\r\n\t\t'DD\/MM\/YYYY')\r\n\tEND) AS FECHA_DE_NACIMIENTO\r\nFROM\r\n\tCEDDTA.IOXR01 T01\r\nLEFT JOIN CEDDTA.IAFI01 T02 ON\r\n\tT01.IOUNME = T02.IAFUNM\r\n\tAND T01.IOHIST = T02.IAFHIS\r\nLEFT JOIN CEDDTA.ITOR01 T03 ON\r\n\tT01.IOUNME = T03.ITOUNM\r\n\tAND T01.IOTPOR = T03.ITOTOR\r\n\tAND T01.IOITEM = T03.ITOITE\r\n\tAND T01.IOTISE = T03.ITOSED\r\n\tAND T01.IOSBTP = T03.ITOSBT\r\nLEFT JOIN CEDDTA.IUSERS T04 ON\r\n\tT01.IOXUSR = T04.UPUSRP\r\nLEFT JOIN CEDDTA.IORD01 T05 ON\r\n\tT01.IOUNME = T05.IOUNME\r\n\tAND T01.IOHIST = T05.IORHIS\r\n\tAND T01.IONUOR = T05.IONUOR\r\n\tAND T01.IOTISE = T05.IOTISE\r\n\tAND T01.IOSBTP = T05.IOSBTP,\r\n\tLIBGEN.DEPENDEN T06\r\nWHERE\r\n\tT01.IOUNME = 4221700000\r\n\tAND CAST(T06.ICELE1 AS DECIMAL(10)) = CAST(T05.IODEPE AS DECIMAL(10))\r\n\tAND T02.IAFHIS <> 0\r\n\tAND T03.ITONIC = 2\r\n\tAND T01.IOTISE IN (2)\r\n\tAND T01.IOSBTP IN (1)\r\n\tAND T01.IOSTDE IN ('V', 'Z')\r\n\tAND T01.IOXDAT BETWEEN 20240915 AND 20240915\r\n\t--milagro"
		];

	//res.json({ result:  json});

	

	/* const CacheUserName = "_SYSTEM";
	const CachePassword = "INFINITY";
	const credentials = `${CacheUserName}:${CachePassword}`;
	const encodedToken = Buffer.from(credentials).toString("base64");
	const responseToken = await loginInfinity(encodedToken);

	let params = {
		soap_method: "GetResults",
		pstrSessionKey: `${responseToken}`,
		pstrOrderDateFrom: "2024-06-13",
		pstrOrderDateTo: "2024-06-13",
		pstrSuperGroupName: "HCA",
	};

	const rawcookies = localStorage.getItem("rawcookies");

	const orden = axios.create({
		baseURL: `${process.env.baseURL}/wso.ws.wResults.cls`,
		params,
		headers: { cookie: rawcookies },
	});

	const resp = await orden.get();
	const data = resp.data; */
  fs.readFile('data.xml',function  (err,data){
xml2js.parseString(
		data,
		{
			explicitArray	: false,
			mergeAttrs: true,
			explicitRoot: false,
			tagNameProcessors: [stripNS],
		},
		(err, result) => {
			if (err) {
				throw err;
			}

			const datafinal =
				result.Body.GetResultsResponse.GetResultsResult.Orders.LISOrder;
			datafinal.forEach((objeto) => {
				const GroupsArray = objeto.LabTests.LISLabTest;
				if (Array.isArray(GroupsArray)) {
					const GroupsList = GroupsArray.map((item) => {
						//console.log(item.TestID);
						const referenciaObjeto = serverBCK.find(
							(ref) => ref.Descripción === item.TestName
						);

						if (referenciaObjeto) {
							return {
								...item,
								TestID: referenciaObjeto.IDexterno,
							};
						} else {
							console.log(`es objectoooooo`);

							const referenciaObjeto = serverBCK.find(
								(ref) => ref.Descripción === item.TestName
							);
							if (referenciaObjeto) {
								return {
									...item,
									TestID: referenciaObjeto.IDexterno,
								};
							}
						}

						return item;
					});

					objeto.LabTests.LISLabTest = GroupsList;
				} else if (typeof GroupsArray === "object" && GroupsArray !== null) {
					const referenciaObjeto = serverBCK.find(
						(ref) => ref.Descripción === GroupsArray.TestName
					);

					if (referenciaObjeto) {
						GroupsArray.TestID = referenciaObjeto.IDexterno;
					}

					objeto.LabTests.LISLabTest = GroupsArray;
				} else {
					console.log("GROUPSARRAY no es un array ni un objeto manejable");

					const referenciaObjeto = serverBCK.find(
						(ref) => ref.Descripción === GroupsArray.TestName
					);
					if (referenciaObjeto) {
						GroupsArray.TestID = referenciaObjeto.IDexterno;
					}

					objeto.LabTests.LISLabTest = GroupsArray;
				}
			});

			const datasuperfinal = datafinal.map((item) => {
				if (item.OptionalDemogList) {
					if (Array.isArray(item.LabTests.LISLabTest)) {
						return {
							HIS: item.OptionalDemogList.LISElementValue[0].Value,
							SampleID: item.SampleID,
							TestID: item.LabTests.LISLabTest.map((test) => ({
								TestID: test.TestID,
								TestName: test.TestName,
								GroupID: test.GroupID,
								TechValDate: test.LabResults.LISLabResult.TechValDate,
								TechValHour: test.LabResults.LISLabResult.TechValHour,
							})),
						};
					} else if (
						typeof item.LabTests.LISLabTest === "object" &&
						item.LabTests.LISLabTest !== null
					) {
						return {
							SampleID: item.SampleID,
							HIS: item.OptionalDemogList.LISElementValue[0].Value,
							TestID: item.LabTests.LISLabTest.TestID,
							TestName: item.LabTests.LISLabTest.TestName,
							GroupID: item.LabTests.LISLabTest.GroupID,
							TechValDate:
								item.LabTests.LISLabTest.LabResults.LISLabResult.TechValDate,
							TechValHour:
								item.LabTests.LISLabTest.LabResults.LISLabResult.TechValHour,
						};
					} else {
						console.log(`LISLabTest no es ni un array ni un objeto manejable`);
						return null;
					}
				}

				return null;
			});

			const filteredData = datasuperfinal.filter((item) => {
				if (item && item.HIS && item.TestID) {
					const testIDs = Array.isArray(item.TestID)
						? item.TestID
						: [{ TestID: item.TestID }];

					return !dat.some((it) => {
						if (it.GroupName !== "HOMAIR") {
							return (
								it.NUMERO_DE_ORDEN.toString() === item.HIS &&
								testIDs.some((testObj) => testObj.Descripción === it.GroupName)
							);
						}
						return (
							it.NUMERO_DE_ORDEN.toString() === item.HIS &&
							testIDs.some((testObj) => testObj.TestID === it.IDexterno)
						);
					});
				}

				return false;
			});

			res.json({ resultados: filteredData.flat() });
			//res.json({ resultados: datasuperfinal });
		}
	);
})
};

module.exports = {
	createresult,
};
