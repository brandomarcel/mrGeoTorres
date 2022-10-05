import * as functions from 'firebase-functions';
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sigeoaloasi@gmail.com',
        pass: 'sigeoprueba'
    }
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const enviarCredencialesMail = functions.https.onRequest((req, res) => {
    cors(req , res, () => {
        const dest = req.query.dest;
        const mailOptions = {
            from: 'SIGEO <sigeoaloasi@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Bienvenido a SIGEO', // email subject
            html: `<subtitle>Bienvenido a la Junta Adminstradora de Agua Potable de los Barrios Occidentales de Aloasí </subtitle>
                    <subtitle>Para acceder a la aplicaicón SIGEO utiliza las siguientes credenciales: </subtitle>
                    <p style="font-size: 16px;">Usuario: ${req.query.user}</p>
                    <p style="font-size: 16px;">Contraseña: ${req.query.pass}</p>
                <br />
            ` // email content in HTML
        };
        return transporter.sendMail(mailOptions, (erro: any, data: any) => {
            if (erro){
                return res.send(JSON.stringify(erro.toString()));
            }
            const dato = JSON.stringify(data);
            return res.send(dato);
        });
    });
});
