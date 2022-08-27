import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({isSignPopup, successSign, onClose}) {
  return (
    <div className={isSignPopup ? "popup popup_opened" : "popup"} id="popup-figure">
      <div className='popup__box'>
        <img className='popup__img' src={successSign ? success : fail} />
        <h2 className='popup__message'>{successSign ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button className="popup__close" type="button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default InfoTooltip;
