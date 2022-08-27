import React, { useState } from "react";
import Sign from './Sign';
import Header from './Header';
import * as auth from '../utils/Auth';
import { Link, useNavigate } from 'react-router-dom';

function Register({onClose, isSignPopup, setIsSignPopup, successSign, setSuccessSign}) {

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
    auth.register(data.email, data.password)
    .then((res) => {
      if (res.status === 400 || res.status === 401) {
        setIsSignPopup(true);
        setSuccessSign(false);
      } else {
        return res.json();
      }
    })
    .then((res) => {
      if (res) {
        setIsSignPopup(true);
        setSuccessSign(true);
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Header><button className='header__button' onClick={() => navigate('/sign-in')}>Войти</button></Header>
      <Sign title='Регистрация' buttonName='Зарегистрироваться' onChange={handleChange} onSubmit={handleSubmit} data={data} isSignPopup={isSignPopup} successSign={successSign} onClose={onClose}>
        <Link to="/sign-in" className="sign__link" >Уже зарегистрированы? Войти</Link>
      </Sign>
    </>
  );
}

export default Register;