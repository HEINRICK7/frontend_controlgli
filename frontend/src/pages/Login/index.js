import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Bounce from 'react-reveal/Bounce';
import { useToasts } from 'react-toast-notifications';

import api from '../../services/api';

import './styles.css';
import '../../global.css';

import contentImg from '../../assets/gli/login.svg';

const Login = () => {
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { addToast } = useToasts();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = { email, password };

        if (email === '' || password === '') {

            addToast('Preencha todos os campos', { 
                appearance: 'info',
                autoDismiss: true,
               
            })
        }
        else {

            try {
                
                const response = await api.post('session', data);
                const { user, firstName, date, token } = response.data;
                console.log(response.data)
                localStorage.setItem('token', token);

                localStorage.setItem('userId', user._id);
                localStorage.setItem('userName', firstName);
                localStorage.setItem('userDate', date);

                history.push("/profile")

        
            } catch (error) {
                
                addToast('Email ou senha incorreto', { 
                appearance: 'error',
                autoDismiss: true,
               
                })
            }
                                          
        }
        
    }
    
    return (
        <div className="logon-container">
            <section className="form"> 
                <Bounce left cascade>
                    <h1>ControlGli</h1>
                    <form onSubmit={ handleLogin }>

                        <h1>Faça seu logon</h1>
                        <input 
                            placeholder="Seu Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                        />
                        <input 
                            placeholder="Seu password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            name="password"
                        />
                        <button className='button' type="submit">Entrar</button>
                        <hr />
                        <Link className='back-link' to="/register">
                            <FiLogIn size={16} color="#ed5757" />
                            Ainda não tem uma conta?
                        </Link>

                    </form>
                </Bounce>
            </section>
            <div className='content'>  
                <Bounce right cascade>
                    <h3>Uma forma simples, prática e colaborativa para controlar o seu diabetes.</h3>
                    <img src={contentImg} width={400} alt="Gli"/>
                </Bounce>
            </div>
        </div>
    );  

}

export default Login