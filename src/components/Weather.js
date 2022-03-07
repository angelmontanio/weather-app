import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../Weather.css"

const apiKey="5e75c567273665cb4e3a6038c62d35d3";


const Weather = () => {

        const[nameCity,setNameCity]=useState("");
        const[nameCountry,setNameCountry]=useState("");
        const[grades,setGrades]=useState("");
        const[iconWeather,setIconWeather]=useState("");
        const[gC,setGC]=useState(true);
        const[serverGrades,setServeGrades]=useState(0);
        const[description,setDescription]=useState("");
        const[wind,setWind]=useState("")
        const[pressure,setPressure]=useState("")
        const[humidity,setHumidity]=useState("")


    
        /*Obtengo la posicion*/
        const successCallback = (position)=>{    
            const latitude=position.coords.latitude
            const longitude=position.coords.longitude
            axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then(res =>{
                    const data=res.data
                
                setNameCity(data.name)//Nombre de la ciudad
                setNameCountry(data.sys.country)//Pais
                setGrades(data.main.temp)
                setIconWeather(data.weather[0].icon)
                setDescription(data.weather[0].description)
                setWind(data.wind.speed)
                setPressure(data.main.pressure)
                setHumidity(data.main.humidity)
            } )
               
        }
    
        const errorCallback =(error)=>{
            console.error(error)
        }
        useEffect(()=>{
        navigator.geolocation.getCurrentPosition(successCallback,errorCallback)
    },[])
    
    const changeGrades= ()=>{
        if(gC===true){
            setServeGrades(grades)
            setGrades((grades*(9/5)+32).toFixed(2))
            setGC(false)
        }else{
            setGrades(serverGrades)
            setGC(true)
            
        }
    }
    return (
        
        <div className='card-container'>
            <h1>{description}</h1>
            <p><b>{nameCity}, {nameCountry}</b></p>
            <div className='circle'>
                <p className='temperature'><b>{grades}{gC?"°C":"°F"}</b></p>
                <button onClick={changeGrades}>Change to {gC?"°F":"°C"}</button>
                <img src={`http://openweathermap.org/img/wn/${iconWeather}@2x.png`} alt="" />
            </div>
            <div className='aditional-infomation'>
            <table>
                <tr>
                    <td><b>Wind:</b></td>
                    <td>{wind} m/s</td>
                </tr>
                <tr>
                    <td><b>humidity:</b></td>
                    <td>{humidity} %</td>
                </tr>
                <tr>
                    <td><b>Pressure:</b></td>
                    <td>{pressure} hPa</td>
                </tr>
            </table>
            </div>
        </div>
    );
};

export {Weather};