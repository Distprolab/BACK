const { Request, Response } = require("express");
const xpath = require("xpath"),
  dom = require("xmldom").DOMParser;
const axios = require("axios").default;
const localStorage = require("localStorage");
const { loginInfinity } = require("../helpers/loginInfinity");

const xml2js = require("xml2js");
const fs = require("fs");

const stripNS = require("xml2js").processors.stripPrefix;
//const parser = new xml2js.Parser({ attrkey: "ATTR" });

const mail = async (req, res) => {
  const { correo, adjunto } = req.body;
  console.log({ correo, adjunto });

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.distprolab.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "christian.solano@distprolab.com", // generated ethereal user
      pass: "12345678", // generated ethereal password
    },
  });

  let mailOptions = {
    from: "christian.solano@distprolab.com", // sender address
    to: `${correo}`, // list of receivers
    subject: "Envio de examenes", // Subject line
    text: "buenos dias estimado/a a recibido los examenes que se a realizo", // plain text body
    html: `<a href="${adjunto}"><i class='bx bxs-file-pdf'>Da clic en este enclace</i></a>`, // html body
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ msg: error.message });
    } else {
      res.status(200).json({ ok: true, msg: "Correo enviado con exito" });
    }
  });
};

const estadic = async (req, res) => {
  const CacheUserName = `${process.env.CacheUserName}`;
  const CachePassword = `${process.env.CachePassword}`;
  const token = `${CacheUserName}:${CachePassword}`;

  const encodedToken = Buffer.from(token).toString("base64");

  const responseToken = await loginInfinity(encodedToken);
  localStorage.setItem("Idtoken", responseToken);
  const tokenResult = localStorage.getItem("Idtoken");
  const rawcookies = localStorage.getItem("rawcookies");
  /*  const token=  localStorage.getItem('Idtoken')*/

  let payload = {
    soap_method: "GetResults",
    //soap_method:'GetResults',
    pstrSessionKey: `${tokenResult}`,

    pstrOrderDateFrom: `2021-01-01`,
    pstrOrderDateTo: `2021-01-31`,

    /* pstrOrderDateFrom: `2023-03-01`,
    pstrOrderDateTo: `2023-03-31`, */
  };

  const orden = axios.create({
    baseURL: `${process.env.baseURL}/wso.ws.wResults.cls`,
    payload,
    //baseURL: `http://192.168.1.2/csp/acb/wso.ws.wResults.cls?${params}`,
    headers: { cookie: rawcookies },
  });
  const resp = await orden.get();
  res.status(200).json({ ok: true, listaordenes: resp.data });

  /*    xml2js.parseString(
        resp.data,
        {
            explicitArray: false,
            mergeAttrs: true,
            explicitRoot: false,
            tagNameProcessors: [stripNS]
        },
        (err, result) => {
            if (err) {
                throw err;
            }
console.log(result)
          
        }
    );  */
};

module.exports = { mail, estadic };
