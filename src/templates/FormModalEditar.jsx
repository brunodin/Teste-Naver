import React, { Component } from 'react';
import './FormModal.css'
import { Link } from 'react-router-dom';
import Modal from './modal/Modal';
import Header from './Header';

import axios from 'axios';

const baseUrl = 'https://navedex-api.herokuapp.com/v1/navers/'
const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
    user: {
        nome: '',
        cargo: '',
        idade: '',
        projetos: '',
        tempEmp: '',
        foto: '',
    },
    visivel: "invisivel",
    criacaoTitulo: "Naver criado",
    criacaoSubTitulo: "Naver foi criado com sucesso!",
    list: []
}

class FormModal extends Component {
    state = { ...initialState }

    componentDidMount() {
        if (token == null) {
            this.props.history.push({
                pathname: `/login`
            })
        }
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const id = this.props.match.params.id
        axios(`${baseUrl}${id}`, config)
            .then(resp => {
                this.setState({...this.state, list: resp.data })
            })
            
        
    }

    _validateFields() {
        const user = { ...this.state.user }
        if (user.nome == '' || user.cargo == ''|| user.idade == ''||
        user.projetos == ''|| user.tempEmp == ''|| user.foto == '') {
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

    async _setNaver() {
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const id = this.props.match.params.id

        axios(`${baseUrl}${id}`, config)
            .then(resp => {
                this.setState({...this.state, list: resp.data })
            })

        if (this._validateFields()) {
            const user = { ...this.state.user }
            console.log("carregando...")
            await axios.put(`${baseUrl}${id}`, {
                name: user.nome,
                admission_date: user.tempEmp,
                job_role: user.cargo,
                project: user.projetos,
                birthdate: user.idade,
                url: user.foto
            }, config).then(resp => {
                console.log(resp)
                console.log("finalizado acerto")
                this.setState({
                    ...this.state,
                    visivel: null,
                    criacaoTitulo: "Naver editado",
                    criacaoSubTitulo: "Naver foi editado com sucesso!"
                })
                console.log('editar', this.state.visivel);
            }).catch(() => {
                this.setState({
                    ...this.state,
                    visivel: null,
                    criacaoTitulo: "Erro Inesperado",
                    criacaoSubTitulo: "Houve um erro inesperado, por favor tente mais tarde!"
                })
            })
        } else {
            this.setState({
                ...this.state,
                visivel: null,
                criacaoTitulo: "Campos Invalidos",
                criacaoSubTitulo: "É necessario preencher todos os campos!"
            })
        }
    }
    // Renderiza os campos
    renderFormModal() {
        // Lista de variaveis criar os campos
        const parametros = ["Nome", "Cargo", "Idade", "Tempo de empresa", "Projetos que participou", "Url da foto do Naver"]
        const placeholder = [`${this.state.list.name}`, `${this.state.list.job_role}`, "Ex: dd/mm/aaaa",
        "Ex: dd/mm/aaaa", `${this.state.list.project}`, `${this.state.list.url}`]
        const valor = ["nome", "cargo", "idade", "tempEmp", "projetos", "foto"]

        return (
            <section className="modal-addremove">
                <div className="modelo-modal container-fluid">
                    <div className="titulo">
                        <Link to="/home"><button className="btn pl-0 mr-2">
                            <i className="fa fa-chevron-left fa-lg"></i>
                        </button></Link> Editar Naver
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
                                        placeholder={placeholder[index]} 
                                        />
                                </div>
                            )
                        })}
                    </div>
                    <div className="botao">
                        <button className="btn btn-custom text-white"
                            onClick={() => this._setNaver()}>
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