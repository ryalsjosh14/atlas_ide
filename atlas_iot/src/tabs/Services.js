//imports
import {useState, useEffect} from 'react'
import MultiSelect from '../components/MultiSelect';

export default function Services() {
	const baseUrl = "http://localhost:5000";

	const [services, setServices] = useState([]);

	const getServices = (event) => {
		event.preventDefault();
		//await fetch(baseUrl);
		const options = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(baseUrl + "/allServices", options)
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				setServices(JSON.parse(data));
				console.log(JSON.parse(data));
			})
			.catch((error) => {
				console.log("there is an error");
				console.log(error);
			});
	};

    const [services, setServices] = useState([]);
    const [things, setThings] = useState([]);
    const [selectedThings, setSelectedThings] = useState([]);

    const getAllServices = () => {
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            }
        };
        fetch(baseUrl + "/allServices", options).then( (response) => response.text())
        .then( (data) => {
            let currentServices = JSON.parse(data);
            //setServices(JSON.parse(data))
            let thingSet = new Set();
            currentServices.forEach(service => {
                if (!thingSet.has(service.Thing_ID)){
                    console.log("in if")
                    console.log(service.Thing_ID)
                    thingSet.add(service.Thing_ID);
                }
            });
            const temp = [...thingSet];
            setThings(temp)
        })
        .catch( (error) => {
            console.log("there is an error getting all services")
            console.log(error);
        })
    }

    const getService = (event) => {
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
            let currentServices = JSON.parse(data);
            let selectedServices = [];

            currentServices.forEach(service => {
                if (selectedThings.includes(service.Thing_ID)){
                    console.log("in if")
                    console.log(service.Thing_ID)
                    selectedServices.push(service);
                }
            });
            setServices(selectedServices)

        })
        .catch( (error) => {
            console.log("there is an error")
            console.log(error);
        })
    }

    useEffect( () => {
        getAllServices()
    }, [])


    return (

        <div>
            <h1>This is the Services Tab</h1>
            <button onClick = {getService}>List Services</button>
            {services.map(x => {
                console.log(x)
                return <h1>{x.Description}</h1>
            })}
            

            <MultiSelect things={things} setSelected={setSelectedThings}></MultiSelect>
            {selectedThings.map(x => {
                console.log(x)
                return <h1>{x}</h1>
            })}

        </div>
    )
}
