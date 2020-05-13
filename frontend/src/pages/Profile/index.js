import React ,{useState, useEffect }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiUser} from 'react-icons/fi';
import { useToasts  } from 'react-toast-notifications';
import api from '../../services/api';
import Moment from 'react-moment';

//import controlGliImg from '../../assets/gli/Group 1.svg';

import './styles.css';
import '../../global.css';

export default function Profile(){

    const [results, setResults] = useState([]);

    const { addToast } = useToasts();

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userDate = localStorage.getItem('userDate');
    
    useEffect(() => {
       api.get('profile', {
           headers: {
            Authorization: userId,

           }
       }).then(response => {
        setResults(response.data);
        
       })
    }, [userId]);
   
    async function handleDeleteResult(id) {
        try {
            await api.delete(`results/${id}`,{
                headers: {
                    Authorization: userId,
                }
            })
            addToast('resultado deletado com sucesso', { 
                appearance: 'info',
                autoDismiss: true,
               
            });
            setResults(results.filter(incident=> incident.id !== id))
        }
        catch(err){

            addToast('Erro ao deletar resultado, tente novamente', { 
                appearance: 'error',
                autoDismiss: true,
                
            });
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/')
    }


    return (
        <div className="profile-container">
            <header>
                <span> 
                    <FiUser color="FFF" size={20}/>  
                     <p>{userName}</p>
                     <Link className="dashboard" to="/dashboard">Dashboard</Link>
                </span>
                
                <button type="button" onClick={handleLogout}>
                    <FiPower color="FFF" size={20}/> 
                </button>
               
            </header> 
            <Link className="button" to="/results/new">Cadastrar novo resultado</Link>
            <h1> Resultados Cadastrados</h1>
            <div className="card">
            <ul>
                {results.map(result => (
                    <li key={result.id}>
                        <strong>
                            Nome:<p>{ userName}</p>
                        </strong>

                        <strong>Idade:  
                            <p>
                                {
                                 new Date().getFullYear() - userDate.split("/")[2] 
                                } Anos
                            </p>
                        </strong>
                        <strong>RESULTADO:
                            <p style={{color:"#ED5656"}}>{result.result} ml/dl</p> 
                        </strong>

                        <strong>DESCRIÇÃO:
                            <p>{result.description}</p> 
                        </strong>

                        <strong>DATA:
                            <p>
                            <Moment format= "DD/MM/YYYY">
                                {result.created_at}
                            </Moment>
                            </p>
                        </strong>
                        <button className="icon" type='button' onClick={()=> handleDeleteResult(result.id)}>
                            <FiTrash2 size={20}/>
                        </button>
                    </li> 
                ))}    
            </ul>
            </div>
        </div>
    );
}