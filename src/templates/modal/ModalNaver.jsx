import React, { Component } from 'react';
import './ModalNaver.css'
import axios from 'axios';

const baseUrl = 'https://navedex-api.herokuapp.com/v1/navers/'

class ModalNaver extends Component {
    state = {
        visivelNaver: this.props.visivelNaver,
        id: '',
        list: []
    }
    async componentWillReceiveProps(prevPros) {
    const { id, visivelNaver } = prevPros
    console.log(visivelNaver)
    if (id == '') {
        return
    } else {
        await this.axios(id)
    }
    await this.setState({
        ...this.state,
        visivelNaver,
        id
    })
    }
    close() {
        this.setState({ visivelNaver: "invisivel-naver" })
    }

    axios(id) {
        let config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhNDRhODVmLTNlNmItNDQ0My05ZjY2LTFkOTc0YzQ5ODkwMCIsImVtYWlsIjoidGVzdGluZy11c2VyQG5hdmUucnMiLCJpYXQiOjE1OTc5MzQ2MDV9.E-sG9ONtCncZTmEEe-DrOy0aoOutJoCGL07U3jjTXbc'
            }
        }
        axios(`${baseUrl}${id}`, config)
            .then(resp => {
                this.setState({ list: resp.data })
            })
    }

    naverInfo() {
        const naver = this.state.list
        return (
            <div className="row mr-0 pr-0">
                <div className="col-6">
                    <img src={naver.url} alt="" />
                </div>
                <div className="conteudo-texto col-6 ml-0 pl-0">
                    <div className="head-modal">
                        <div className="col-11">
                            <h2 className="mb-0">{this.state.list.name}</h2>
                        </div>
                        <div className="col-1">
                            <button id="close" className="btn pt-2"
                                onClick={() => this.close()}>
                                <i className="fa fa-times fa-lg" />
                            </button>
                        </div>
                    </div>
                    <div className="body-naver">
                        <span className="naver-funcao">{naver.job_role}</span>
                        <h3 className="naver-info" >Idade</h3>
                        <span >{new Date().getFullYear() - new Date(naver.birthdate).getFullYear()} anos</span>
                        <h3 className="naver-info">Tempo de empresa</h3>
                        <span className="">{new Date().getFullYear() - new Date(naver.admission_date).getFullYear()} anos trabalhados</span>
                        <h3 className="naver-info">Projetos que participou</h3>
                        <span className="n">{naver.project}</span>

                    </div>
                </div>
            </div>
        )
    }
    renderAlert() {
        return (
            <React.Fragment>
                {/* Divs responsaveis em criar o fundo do modal */}
                <div id="modal-naver" className={this.state.visivelNaver}
                    onClick={() => this.close()}>
                    <div className="bg-modal">
                        {/* Div responsavel em criar o modal */}
                        <div className="conteudo-modal-naver">
                            {/* Divisões do modal */}
                            {this.naverInfo()}
                        </div>
                    </div>
                </div>
            </React.Fragment >
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
export default ModalNaver;

