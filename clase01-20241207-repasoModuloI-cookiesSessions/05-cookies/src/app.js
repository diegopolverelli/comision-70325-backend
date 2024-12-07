import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("Coder123"))
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{

    console.log(req.headers)


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get("/setcookies", (req, res)=>{

    let info={
        theme:"Dark", 
        font:"Arial", 
        fontSize:22
    }

    // res.cookie("cookie01simple", info, {})
    res.cookie("cookie01simple", info)
    res.cookie("cookie02conVtoMaxAge", info, {maxAge: 1000*5})
    res.cookie("cookie03conVtoExpire", info, {expires: new Date(2024, 11, 31)})
    res.cookie("cookie04conVtoExpireSigned", info, {expires: new Date(2024, 11, 31), signed:true})


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies generadas"});
})


app.get("/getCookies", (req, res)=>{


    let cookies=req.cookies
    console.log(cookies.cookie01simple.font)
    let cookiesFirmadas=req.signedCookies



    res.setHeader('Content-Type','application/json');
    return res.status(200).json({cookies, cookiesFirmadas});
})

app.get("/delCookies", (req, res)=>{

    console.log(req.cookies)
    let cookies=Object.keys(req.cookies)
    console.log(cookies)
    cookies.forEach(c=>{
        res.clearCookie(c)
    })
    // String
    // Number
    // Boolean

    cookies=Object.keys(req.signedCookies)
    console.log(cookies)
    cookies.forEach(c=>{
        res.clearCookie(c)
    })

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Cookies borradas!`});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
