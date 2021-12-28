import React ,{useState, useEffect }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiUser} from 'react-icons/fi';
import { useToasts  } from 'react-toast-notifications';
import api from '../../services/api';
import Moment from 'react-moment';

//import controlGliImg from '../../assets/gli/Group 1.svg';

import './styles.css';
import '../../global.css';

const Profile = () => {

    const [results, setResults] = useState([]);

    const { addToast } = useToasts();

    const history = useHistory();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userDate = localStorage.getItem('userDate');
    
    useEffect(() => {
       api.get('profile', {
        headers: {
            "Authorization" : `Bearer ${token}`
        }
       }).then(response => {
        setResults(response.data);
        
       })
    }, [token]);
   
    const handleDeleteResult = async (id) => {
        try {
            await api.delete(`results/${userId}`,{
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            addToast('resultado deletado com sucesso', { 
                appearance: 'info',
                autoDismiss: true,
               
            });
            setResults(results.filter(incident => incident.id !== id))
        }
        catch(err){

            addToast('Erro ao deletar resultado, tente novamente', { 
                appearance: 'error',
                autoDismiss: true,
                
            });
        }
    }
   
    const handleLogout = () => {
        localStorage.clear();

        history.push('/')
    }
    const calculaIdade = ([data]) => {
        const anoNascParts = data.split("/")
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const diaNasc = anoNascParts[0];
        const mesNasc = anoNascParts[1];
        const anoNasc = anoNascParts[2];
        

        let idade = anoAtual - anoNasc;
        const mesAtual = dataAtual.getMonth() + 1;

        if(mesAtual < mesNasc) {
            idade--;
        }
        else{
            if(mesAtual === mesNasc) {
                if(new Date().getDate() < diaNasc){
                    idade--;
                }
            }
        }

        return idade;
    }
    console.log(results)
    return (
        <div className="profile-container">
            <header>
                <span> 
                    <FiUser color="FFF" size={20}/>  
                     <p>{}</p>
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
                    <li key={result._id}>
                        <strong>
                            Nome:<p>{ result.user_id.map((res) => res.first_name )}</p>
                        </strong>

                        <strong>Idade:  
                            <p>
                                {calculaIdade(result.user_id.map((res) => res.date ))} Anos 
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
                                {result.date}
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

export default Profile;