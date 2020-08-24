import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Router from '../main/Router';
import './App.css';
import Login from '../login/Login';
import AddRemove from '../templates/FormModal';
import Home from '../templates/Home';
import Header from '../templates/Header';



const prosp = () => {
    return (
        <BrowserRouter>
            <div className="app m-4">
                <Router/>
            </div>
        </BrowserRouter>
    )
}

export default prosp;