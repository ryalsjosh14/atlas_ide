//imports
import {useState} from 'react'



export default function Things(){

    const baseUrl = "http://localhost:5000";

    const [things, setThings] = useState([]);

    

    const getThings = (event) => {
        event.preventDefault()
        //await fetch(baseUrl);
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            }
        };
        fetch(baseUrl + "/getThings", options).then( (response) => response.text())
        .then( (data) => {
            console.log(data)
            setThings(JSON.parse(data))
            console.log(JSON.parse(data))
        })
        .catch( (error) => {
            console.log("there is an error")
            console.log(error);
        })
    }

    

    return (

        <div>
            <h1>This is the Things Tab</h1>
            <button onClick={getThings}>get things</button>
            {things.map(x => {
                console.log(x)
                return <h1> {x.Thing_ID }</h1>
            })}
            <p> Here is where more info about each thing will go</p>
        </div>
        
    )
}