import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import registerGliImg from '../../assets/gli/register.svg';
import Bounce from 'react-reveal/Bounce';

import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import './styles.css';
import '../../global.css';

export default function Register() {
    const [first_name, setFirst_name] = useState( '' );
    const [last_name, setLast_name] = useState( '' );
    const [date, setDate] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );

    const { addToast } = useToasts();

    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            first_name,
            last_name,
            date,
            email,
            password,
         }  

        await api.post('/users',data)
        .then(response => {
            if(!data){
                addToast('Preencha todos os campos',response.data, {
                    appearance: 'info',
                    autoDismiss: true,
                })
            }
            else{
                addToast('ok', {
                appearance: 'success',
                autoDismiss: true,
                })
                history('/session')
            }
            

        }).catch(error => {
            
            addToast('Preencha todos os campos', {
                appearance: 'info',
                autoDismiss: true,
            })
            
        }) 
    
    }
  
    return (
    <div className='register-container'>
      
        <Bounce left cascade>
            
                <section>
		            <form onSubmit={handleRegister}>
                        <h1>ControlGli</h1>
                        <h2>Registre-se</h2>

                            <input 
                                type="text" 
                                placeholder="Nome"
                                value={first_name}
                                onChange={ e => setFirst_name(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Sobrenome" 
                                value={last_name}
                                onChange={ e => setLast_name(e.target.value)}
                            />
                       

                            <input
                                type="text" 
                                placeholder='dd/mm/aaaa'
                                value={date}
                                onChange={ e => setDate(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Email"
                                value={email}
                                onChange={ e => setEmail(e.target.value)}
                            />
                            <input
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={ e => setPassword(e.target.value)}
                            />

		    	            <button className="button" type="submit">Salvar</button>

                            <hr/>

                            <Link to="/" >
                             <FiArrowLeft size={18} color="#ED5757" /> 
                             Você já tem uma conta ?
                            </Link>

		            </form>
                </section>
            
        </Bounce> 
        <div className='content'>  
            <Bounce right cascade>
                <h3>Faça o seu cadastro e entre na plataforma</h3>
                <img src={registerGliImg} width={500} alt="Heroes"/>
            </Bounce>
        
        </div>
            
    </div>  
      
    
    );
}