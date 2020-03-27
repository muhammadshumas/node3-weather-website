let getWeather=function(search){

   datas= fetch('http://localhost:3000/weather?address='+search).then((res)=>{
    return res.json().then((data)=>{
        if(data.error){
            return {error:data.error}
        }
        else{
            return {
                location:data.location,
                forecast:data.forecast
            }
        }
    })
})
    console.log(datas)
    return datas
}

const weatherForm=document.querySelector('form')
let weatherData=document.querySelector('.weather-data')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let location=e.target.location.value
    weatherData.innerHTML=`<p>Loading...</p>`
    getWeather(location).then(data=>{
        e.target.reset()
        if(data.error){
            weatherData.innerHTML=`<p>${data.error}</p>`
            return
        }
       weatherData.innerHTML=`
        <p>${data.location}</p>
        <p>${data.forecast}</p>
        `
        
    })
})