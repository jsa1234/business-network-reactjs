import React from 'react';
import Cancel from "../../public/assests/icons/cancel.svg";
import Success from "../../public/assests/icons/success.svg";

const Popup = ({showModal,handleModalClose}) => {
  const sendValue = () => {
        handleModalClose(!showModal); // Call the parent's function
  };
  return (
    showModal==true?
    <div className='modal'>
        <div className='modal-content'>
        <span className="close" onClick={sendValue}><Cancel/></span>
            <Success/>
            <h1>Success!</h1>
            <p>Details has been successfully submitted. Thanks!</p>
            <button className='secondary__btn justify-center mt-6' onClick={sendValue}>
                OK
            </button>
        </div>
    </div>:''
  )
}

export default Popup;