import React, { Component } from 'react';
import './ModalExcluir.css'
import axios from 'axios'
import Modal from '../modal/Modal';

const baseUrl = 'https://navedex-api.herokuapp.com/v1/navers/'
const token = JSON.parse(localStorage.getItem('token'))

class ModalExcluir extends Component {
    state = {
        visivelExcluir: "invisivel-excluir",
        visivelModal: "invisivel",
        criacaoTitulo: "Naver excluido",
        criacaoSubTitulo: "Naver foi excluido com sucesso!",
        id: ''
    }
    componentWillReceiveProps(prevPros) {
        const { visivelExcluir, id } = prevPros
        this.setState({
            ...this.state,
            visivelExcluir,
            id
        })
    }
    close() {
        this.setState({ visivelExcluir: "invisivel-excluir" })
    }

    async _deleteNaver() {
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const id = this.state.id
        console.log("carregando...")
        await axios.delete(`${baseUrl}${id}`, config).then(resp => {
            this.setState({
                ...this.state,
                visivelExcluir: "invisivel-excluir",
                visivelModal: null
            })
            console.log(resp);
        }).catch(error => {
            console.log("finalizado erro")
            console.log(error.response)
        })
    }

    renderAlert() {
        return (
            <React.Fragment>
                <Modal visivel={this.state.visivelModal}
                    criacaoTitulo={this.state.criacaoTitulo}
                    criacaoSubTitulo={this.state.criacaoSubTitulo} />
                <div id="modal-excluir" className={this.state.visivelExcluir}
                    onClick={() => this.close()}>
                    <div className="bg-modal">
                        <div className="conteudo-modal">
                            <div className="head-modal ">
                                <div className="col-6 ">
                                    <h2>Excluir Naver</h2>
                                </div>
                            </div>
                            <div className="body-modal">
                                <p>Tem certeza que deseja excluir este Naver?</p>
                            </div>
                            <div className="footer-modal">
                                <button className="btn btn-cancelar"
                                    onClick={() => this.close()}>Cancelar</button>
                                <button className="btn btn-excluir"
                                    onClick={() => this._deleteNaver()}>Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )

    }

    render() {
        return (
            <React.Fragment>
                {this.renderAlert()}
            </React.Fragment>
        );
    }
}

export default ModalExcluir;