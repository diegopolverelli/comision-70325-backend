// hddd faas thkw rnlf
import nodemailer from "nodemailer"


// const transporter=nodemailer.createTransport(
//     {
//         service: "gmail", 
//         port: "587",
//         auth: {
//             user: "diegopolverelli@gmail.com", 
//             pass: "hddd faas thkw rnlf"
//         }
//     }
// )

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kaleigh.glover@ethereal.email',
        pass: 'CFjVcRV6DJjjbyX4RV'
    }
});

const enviar=()=>{
    return transporter.sendMail({
        from: "Aplicacion de prueba diegopolverelli@gmail.com",
        to: "diegopolverelli@hotmail.com, diepol@yahoo.com", 
        subject: "Prueba envío de email simple Ethereal", 
        // text: "prueba de mail simple",
        html: `<h1>Prueba mails simples Ethereal</h1><br><p style="color:blue;">Esta es una prueba</p>`
    })
}

enviar().then(res=>console.log(res))

