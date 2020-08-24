import React, { Component } from 'react';
import './Login.css'
import logo from '../assets/logo.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const initialState = {
    user: {
        email: '', password: ''
    },
    list: []
}
const baseUrl = 'https://navedex-api.herokuapp.com/v1/users/login'
class Login extends Component {
    state = { ...initialState }

    componentWillMount(){
            const token = JSON.parse(localStorage.getItem('token'))
            if (token != null){
                this.props.history.push({
                    pathname: `/home`
                })
            }
    }

    _validateFields() {
        const user = { ...this.state.user }
        if (user.email == "" || user.password == "") {
            return false
        }
        else {
            return true
        }
    }

    _updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    _getLogin() {
        if (this._validateFields()) {
            const user = { ...this.state.user }
            console.log("carregando...")
            axios.post(baseUrl, {
                email: user.email,
                password: user.password
            }).then(resp => {
                console.log("finalizado")
                localStorage.setItem('token', JSON.stringify(resp.data.token))
                this.props.history.push({
                    pathname: `/home`
                })
            }
            ).catch(error => {
                console.log("finalizado")
                console.log(error.response)
            })
        } else {

        }

    }

    render() {
        return (
            <div className="centralizar">
                <div className="caixa container-fluid">
                    <div className="logo">
                        <img src={logo} width="230" height="60" />
                    </div>
                    <div className="m-2">

                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                placeholder="E-mail" name="email"
                                value={this.state.user.email}
                                onChange={e => this._updateField(e)} />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control"
                                placeholder="Senha" name="password"
                                value={this.state.user.password}
                                onChange={e => this._updateField(e)} />
                        </div>
                        <button id="btn-entrar" className="btn btn-white"
                            onClick={e => this._getLogin()}>
                            <span>Entrar</span>
                        </button>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;