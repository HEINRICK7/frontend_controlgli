import React, {useState, useEffect} from 'react';

import { Line } from 'react-chartjs-2';

import api from '../../services/api'

import NavBar from '../../components/NavDashboard'

import './styles.css';

export default function Dashboard (){

 const [result, setResults] = useState([]);


 const token = localStorage.getItem('token');

    useEffect(() => {
        api.get('profile', {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }).then(response => {
            setResults(response.data);
        })
    }, [token]);

    
    return (
        <>  
            <NavBar/>
            <div className="chart">
                <h1 align="center" style={{color:"#ED5757"}}>Dashboard</h1>
                <Line 
                    data={{
                        labels: result.map(({date})=> date),
                        datasets:[{
                            data: result.map(({result})=> result),
                            label: 'Resultados',
                            borderColor: '#ED5757',
                        }]
                    }}
                    options={{ maintainAspectRatio: true }}
                />
            </div>
        </>
    )
}