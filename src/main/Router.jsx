import React from 'react';
import {Switch, Route, Redirect} from 'react-router';

import Login from '../login/Login';
import AddRemove from '../templates/FormModal';
import FormEditar from '../templates/FormModalEditar'
import Home from '../home/Home';

const props = () => {
    return (
        <Switch>
            <Route path='/login' component={Login}/>
            <Route exact path='/home' component={Home}/>
            <Route path="/adicionar" component={AddRemove}/>
            <Route path="/editar/:id" component={FormEditar}/>
            <Redirect from='/' to='/login'/>
        </Switch> 
    );
}

export default props;