import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';



const prosp = () => {

   function btnSair(){
    localStorage.removeItem('token')
    window.location.reload(true)
   }

    return (
        <header className="header">
            <div className="row">
                <div className="col-6 logo-naver">
                    <img src={logo} alt="Logo naver"/>
                </div>
                <div className="col-6 letra">
                    <button className="btn"
                    onClick={() => btnSair()}>
                    <strong>Sair</strong>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default prosp;