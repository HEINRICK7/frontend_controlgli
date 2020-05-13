import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../services/api'

import './styles.css';

export default function Dashboard (){

 const [result, setResults] = useState([]);

 const userId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('profile', {
            headers: {
             Authorization: userId,
            }
        }).then(response => {
            setResults(response.data);
        })
    }, [userId]);

    
    return (
        <>
            <div className="chart">
                <h1 align="center" style={{color:"#ED5757"}}>Dashboard</h1>
                <Line 
                    data={{
                        labels: result.map(({created_at})=> created_at),
                        datasets:[{
                            data: result.map(({result})=> result),
                            label: 'Resultados',
                            borderColor: '#ED5757',
                            backgroundColor: '#ED8176'
                        }]
                    }}
                    width={100}
                    height={250}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        </>
    )
}