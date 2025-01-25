import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth:{
            user:"diegopolverelli@gmail.com", 
            pass: "hddd faas thkw rnlf"
        }
    }
)

const enviar=()=>{
    return transporter.sendMail({
        from: "App prueba diegopolverelli@gmail.com",
        to: "diegopolverelli@hotmail.com",
        subject: "prueba mail con adjuntos", 
        html: `Prueba envio adjuntos!!!`,
        attachments:[
            {
                path: "./images/diego10.jpg",
                filename: "diegote.jpg", 
            },
            {
                path: "./images/lio.jpg",
                filename: "Messi01.jpg", 
            },
            {
                path: "./images/lio2.jpg",
                filename: "lio2.jpg", 
            },
        ]
    })
}

enviar()
    .then(res=>console.log(res))
    .catch(e=>console.log(e.message))