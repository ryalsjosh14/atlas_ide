//imports
import {useState} from 'react'


export default function Services(){

    const baseUrl = "http://localhost:5000";

    const [services, getServices] = useState([]);



    const getServices = (event) => {
        event.preventDefault()
        //await fetch(baseUrl);
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            }
        };
        fetch(baseUrl + "/allServices", options).then( (response) => response.text())
        .then( (data) => {
            console.log(data)
            getServices(JSON.parse(data))
            console.log(JSON.parse(data))
        })
        .catch( (error) => {
            console.log("there is an error")
            console.log(error);
        })
    }

 


    return (

        <div>
            <h1>This is the Services Tab</h1>
            <button onClick = {getServices}>List Services</button>
            {services.map(x => {
                console.log(x)
                return <h1>{x.services}</h1>
            })}

            <p> Filter function here </p>


        </div>
    )
}