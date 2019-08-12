const request=require('request')



const geocode=(location,callback)=>{
    let locvlue=encodeURIComponent(location)
    let url=`http://api.mapbox.com/geocoding/v5/mapbox.places/${locvlue}.json?access_token=<api token here>`
    request.get({url:url,json:true},(error,response)=>{
        if(error){
            callback('Error in connecting',{
                latitude:undefined,
                longitude:undefined
            })
        }else if(response.body.features.length==0){
            callback('No locations found',{
                latitude:undefined,
                longitude:undefined
            })
        }else{
            callback(undefined,{
                latitude:response.body.features[0].geometry.coordinates[1],
                longitude:response.body.features[0].geometry.coordinates[0]
            })
        }
    })
}

const weather=(lat,long,callback)=>{
    let url=`https://api.darksky.net/forecast/<api token here>/${lat},${long}`
    request.get({url:url,json:true},(error,response)=>{
        if(error){
            callback('Error in connecting',undefined)
        }else if(response.statusCode==400){
            callback('Error in getting weather data',undefined)
        }else{
            callback(undefined,{
                currenttemp:response.body.currently.temperature,
                forecasttemp:response.body.currently.apparentTemperature,
                currentstatus:response.body.currently.summary,
                weeksummary:response.body.daily.summary
            })
        }
    })
}

module.exports={
    geocode,
    weather
}