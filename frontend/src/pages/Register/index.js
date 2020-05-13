import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import registerGliImg from '../../assets/gli/register.svg';
import Bounce from 'react-reveal/Bounce';
import InputMask from 'react-input-mask';

import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import './styles.css';
import '../../global.css';

export default function Register() {
    const [firstName, setFirstName] = useState( '' );
    const [lastName, setLastName] = useState( '' );
    const [date, setDate] = useState( '' );
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );

    const { addToast } = useToasts();

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            date,
            email,
            password,
         } 

        const response = await api.post('users',data);

        if ( firstName !== '' && lastName !== '' && date !== '' && email !== '' && password !== ''){

            if(response.status === 201){
               addToast('Usuário cadastrado com esse email no banco de dados, tente com outro email.', {
                   appearance: 'error',
                   autoDismiss: true,
               })
            }else{
                addToast('Usuário cadastrado com sucesso.', {
                    appearance: 'success',
                    autoDismiss: true,
                })

                history.push('/');

            }
        }else{

            addToast('Preencha todos os campos.', {
                appearance: 'info',
                autoDismiss: true,
            })

        }
    
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
                                value={firstName}
                                onChange={ e => setFirstName(e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Sobrenome" 
                                value={lastName}
                                onChange={ e => setLastName(e.target.value)}
                            />
                       

                            <InputMask mask="99/99/9999"  
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