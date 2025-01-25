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
        subject: "prueba mail con adjuntos incrustados", 
        html: `Prueba envio adjuntos!!!

<img src="cid:adjunto01" width="300">
<img src="cid:messi01" width="300">
<img src="cid:messi02" width="300">

        `,
        attachments:[
            {
                path: "./images/diego10.jpg",
                filename: "diegote.jpg", 
                cid: "adjunto01"
            },
            {
                path: "./images/lio.jpg",
                filename: "Messi01.jpg", 
                cid: "messi01"
            },
            {
                path: "./images/lio2.jpg",
                filename: "lio2.jpg", 
                cid: "messi02"
            },
        ]
    })
}

enviar()
    .then(res=>console.log(res))
    .catch(e=>console.log(e.message))