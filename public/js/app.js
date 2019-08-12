console.log('App file loaded')


const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgOne=document.querySelector('#msg1')
const msgTwo=document.querySelector('#msg2')
const msgThree=document.querySelector('#msg3')
const msgFour=document.querySelector('#msg4')
const slct=document.querySelector('#slct')
slct.style.display='none'

msgOne.textContent='Search above'
msgTwo.textContent='Search above'
msgThree.textContent='Search above'
msgFour.textContent='Search above'

let msg1=0
let msg2=0
let msg3=''
// let msg4=''

const fetchdata=async (url)=>{
    try{
        const jsondata=await fetch(url)
        const data=await jsondata.json()
        // throw new Error('Just an err')
        if(data.error){
            throw new Error(data.error)
        }else{
            console.log(data)
            return data
        }

    }catch(e){
        throw new Error(e.message)
        // console.log('cc')
        // return e.message
    }
    
}

// fetchdata(url)

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const locn=search.value
    //a

    if(locn){
        let url=`http://localhost:3000/weather?location=${locn}`
        const locdata=fetchdata(url).then((result)=>{
            console.log('success')
            msgOne.textContent=`${result.currenttemp} °F`
            msgTwo.textContent=`${result.forecasttemp} °F`
            msgThree.textContent=result.currentstatus
            msgFour.textContent=result.weeksummary
            // console.log(result.weeksummary.indexOf('°F'))
            msg1=result.currenttemp
            msg2=result.forecasttemp
            msg3=result.weeksummary
            slct.style.display='block'
            slct.value='fahr'
        }).catch((e)=>{
            console.log('in error')
            msgOne.textContent=e.message
            msgTwo.textContent=''
            msgThree.textContent=''
            msgFour.textContent=''
            msg1=0
            msg2=0
            msg3=''
        })
    }else{
        msgOne.textContent='Enter a location to search'
        msgTwo.textContent=''
        msgThree.textContent=''
        msgFour.textContent=''
        slct.style.display='none'

    }
})



slct.addEventListener('change',()=>{
    if (slct.value==='fahr'){
        msgOne.textContent=`${msg1} °F`
        msgTwo.textContent=`${msg2} °F`
        msgFour.textContent=msg3
    }else if(slct.value==='cels'){
        let cnvrted1=(msg1-32)*(5/9)
        let cnvrted2=(msg2-32)*(5/9)
        let pstn=msg3.indexOf('°F')
        let tmp=msg3.replace(/[0-9]/g,'')
        //tmp.replace(/[0-9]/g,'')
        //console.log(tmp)
        let celstmp=(((msg3.match(/[0-9]/g).join(''))-32)*(5/9)).toFixed(2)
        //console.log(celstmp)
        let tmp2=[tmp.slice(0,pstn-2),celstmp,tmp.slice(pstn-2)].join('')
        tmp2=tmp2.replace('°F','°C')
        //console.log(tmp2)
        
        msgOne.textContent=`${cnvrted1.toFixed(2)} °C`
        msgTwo.textContent=`${cnvrted2.toFixed(2)} °C`
        msgFour.textContent=tmp2
    }
    
    //console.log(cnvrted1)
})