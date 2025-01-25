import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: "587",
        auth: {
            user: "diegopolverelli@gmail.com", 
            pass: "hddd faas thkw rnlf"
        }
    }
)

export const enviarMail=(to, subject, message, adjuntos=[])=>{
    console.log(adjuntos)
    return transporter.sendMail({
        from: "Aplicacion de prueba diegopolverelli@gmail.com",
        to, 
        subject, 
        // text: "prueba de mail simple",
        html: message, 
        attachments: adjuntos
    })
}