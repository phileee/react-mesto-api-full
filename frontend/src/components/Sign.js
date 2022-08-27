import React from "react";
import InfoTooltip from './InfoTooltip';

function Sign({title, buttonName, children, onChange, onSubmit, data, isSignPopup, successSign, onClose}) {

  return (
    <div className='sign'>
      <div className="sign__box">
        <h2 className="sign__header">{title}</h2>
        <form className="sign__form" name="signForm" id="signForm" onSubmit={onSubmit}>
          <input className="sign__input" type="email" name="email" id="email" value={data.email} onChange={onChange} minLength="2" maxLength="30" required placeholder="Email" />
          <input className="sign__input" type='password' name="password" id="password" value={data.password} onChange={onChange} minLength="2" maxLength="30" required placeholder="Пароль" />
          <button className="sign__button" type="submit" onSubmit={onSubmit}>{buttonName}</button>
        </form>
        {children}
      </div>
      <InfoTooltip isSignPopup={isSignPopup} successSign={successSign} onClose={onClose} />
    </div>
  );
}

export default Sign;
