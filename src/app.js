const express=require('express')
const hbs=require('hbs')
const path=require('path')
const weather=require('../src/utils/weather.js')

const port=process.env.PORT||3000
const publicpath=path.join(__dirname,"../public")
const viewpath=path.join(__dirname,'../src/views')
const partialpath=path.join(__dirname,'../src/partials')
console.log(publicpath)
const app=express()
app.use(express.static(publicpath))
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)


app.get('/',(req,res)=>{
    res.render('index',{
        name:'Home'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'About'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.location){
        res.status(400).send({
            error:'Pass a location'
        })
    }else{
        weather.geocode(req.query.location,(error,{latitude,longitude})=>{
            if(error){
                res.status(400).send({
                    error,
                    undefined
                })
            }else{
                // let lat=data.latitude
                // let longval=data.longitude
                // const {lat,longval}=data
                weather.weather(latitude,longitude,(error1,data1)=>{
                    if (error1){
                        res.send({
                            error:error1,
                            undefined
                        })
                    }else{
                        res.send({
                            error:undefined,
                            currenttemp:data1.currenttemp,
                            forecasttemp:data1.forecasttemp,
                            currentstatus:data1.currentstatus,
                            weeksummary:data1.weeksummary
                        })
                    }
                })
            }
        })
    }
})

app.listen(port,()=>{
    console.log('Server Started..')
})