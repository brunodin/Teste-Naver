import React, { Component } from 'react';
import './FormModal.css'
import { Link } from 'react-router-dom';
import Modal from './modal/Modal';
import Header from './Header';

import axios from 'axios';

const baseUrl = 'https://navedex-api.herokuapp.com/v1/navers/'

const initialState = {
    user: {
        nome: '',
        cargo: '',
        idade: '02-02-2000',
        projetos: '',
        tempEmp: '',
        foto: '',
    },
    visivel: "invisivel",
    criacaoTitulo: "Naver criado",
    criacaoSubTitulo: "Naver foi criado com sucesso!"
}

class FormModal extends Component {
    state = { ...initialState }

    _validateFields() {
        const user = { ...this.state.user }
        if (user.nome == '' || user.password == "") {
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

    async _createNaver() {
        const token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }
        if (this._validateFields()) {
            const user = { ...this.state.user }
            console.log("carregando...")
            await axios.post(baseUrl, {
                name: user.nome,
                admission_date: user.tempEmp,
                job_role: user.cargo,
                project: user.projetos,
                birthdate: user.idade,
                url: user.foto
            }, config).then(() => {
                console.log("finalizado")
                this.setState({
                    ...this.state,
                    visivel: null,
                    criacaoTitulo: "Naver criado",
                    criacaoSubTitulo: "Naver foi criado com sucesso!"
                })
                
            }).catch(error => {
                this.setState({
                    ...this.state,
                    visivel: null,
                    criacaoTitulo: "Ocorreu um erro",
                    criacaoSubTitulo: "Ocorreu um erro ao adicionar seu naver, por favor verifique se todas as informações estão corretas"
                })
            })
        } else {
            this.setState({
                visivel: null,
                criacaoTitulo: "Naver criado",
                criacaoSubTitulo: "Naver foi criado com sucesso!"
            })
            console.log("no set=", this.state.visivel)
        }
    }
    // Renderiza os campos
    renderFormModal() {
        // Lista de variaveis criar os campos
        const parametros = ["Nome", "Cargo", "Idade", "Tempo de empresa", "Projetos que participou", "Url da foto do Naver"]
        const valor = ["nome", "cargo", "idade", "tempEmp", "projetos", "foto"]
        const placeholder = ["Nome", "Cargo", "Ex: dd/mm/aaaa", "Ex: dd/mm/aaaa", "Projetos", "ex: www..."]

        return (
            <section className="modal-addremove">
                <div className="modelo-modal container-fluid">
                    <div className="titulo">
                        <Link to="/home"><button className="btn pl-0 mr-2">
                            <i className="fa fa-chevron-left fa-lg"></i>
                        </button></Link> Adicionar Naver
                            </div>
                    <div className="form row mt-4">
                        {/* Laço para criar as tabelas de modo dinamico */}
                        {parametros.map((result, index) => {
                            return (
                                <div className="form-group col-12  col-sm-6"
                                    key={result}>
                                    <label>{result}</label>
                                    <input type="text" className="form-control"
                                        onChange={e => this._updateField(e)}
                                        name={valor[index]}
                                        value={this.state.user[result]}
                                        placeholder={placeholder[index]} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="botao">
                        <button className="btn btn-custom text-white"
                            onClick={() => this._createNaver()}>
                            Salvar
                            </button>
                    </div>
                </div>
            </section>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Modal visivel={this.state.visivel}
                    criacaoTitulo={this.state.criacaoTitulo}
                    criacaoSubTitulo={this.state.criacaoSubTitulo}>
                    {this.renderFormModal()}
                </Modal>
            </React.Fragment>
        )
    }
}

export default FormModal;