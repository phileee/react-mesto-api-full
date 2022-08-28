import React, { useState } from "react";
import Sign from './Sign';
import Header from './Header';
import * as auth from '../utils/Auth';
import { useNavigate } from 'react-router-dom';

function Login({onClose, isSignPopup, setIsSignPopup, successSign, setSuccessSign, setLoggedIn}) {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.authorize(data.email, data.password)
    .then((res) => {
      if (res.status === 400 || res.status === 401) {
        setIsSignPopup(true);
        setSuccessSign(false);
        throw new Error('Сервер вернул статус ' + res.status)
      } else {
        return res.json();
      }
    })
    .then((res) => {
      //localStorage.setItem('jwt', res.token);
      //document.cookie=`jwt=${document.cookie.slice(4)}`;
      console.log(document.cookie);
      localStorage.setItem('email', data.email);
      setLoggedIn(true);
      navigate('/');
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Header><button className='header__button' onClick={() => navigate('/sign-up')}>Регистрация</button></Header>
      <Sign title='Вход' buttonName='Войти' onChange={handleChange} onSubmit={handleSubmit} data={data} isSignPopup={isSignPopup} successSign={successSign} onClose={onClose} />
    </>
  );
}

export default Login;
