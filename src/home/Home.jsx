import React, { Component } from 'react';
import './Home.css';
import Nav from '../templates/Nav';
import Header from '../templates/Header';
import axios from 'axios';
import ModalNaver from '../templates/modal/ModalNaver';
import ModalExcluir from '../templates/modal/ModalExcluir';

const baseUrl = 'https://navedex-api.herokuapp.com/v1/navers'

class Home extends Component {
    state = {
        visivel: "invisivel-naver",
        visivelExcluir: "invisivel-excluir",
        id: '',
        idExcluir: '',
        list: []
    }
    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token == null) {
            this.props.history.push({
                pathname: `/login`
            })
        } else {
            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            axios(baseUrl, config)
            .then(resp => {
                this.setState({ list: resp.data })
            })
        }        
    }
    async showNave(event) {
        await this.setState({
            ...this.state,
            visivel: null,
            visivelExcluir: "invisivel-excluir",
            id: event.currentTarget.id
        })
    }
    async deleteNaver(id) {
        console.log('this.state',this.state)
       await this.setState({
            ...this.state,
            visivel: "invisivel-naver",
            visivelExcluir: null,
            idExcluir: id

        })
        console.log(this.state.visivel)
    }

    editNaver(e) {
        this.props.history.push(`/editar/${e}`)
    }

    render() {
        const result = this.state.list
        let i = 0
        return (
            <>
                <Header />
                <Nav />
                <ModalNaver visivelNaver={this.state.visivel}
                    id={this.state.id} />
                <ModalExcluir visivelExcluir={this.state.visivelExcluir}
                                id={this.state.idExcluir} />
                <section className="conteudo-naver mt-5">
                    <div className="row ">
                        {result.map(results => {
                            return (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 info-naver" key={results.id}>
                                    <div id={results.id} onClick={e => this.showNave(e)}>
                                        <div className="imagem">
                                            <img src={results.url} alt="" />
                                        </div>
                                        <div className="pessoa-naver mt-2">
                                            <strong>{results.name}</strong>
                                            <span className="mt-1 d-block">{results.job_role}</span>
                                        </div>
                                    </div>
                                    <div className="icones mt-0 mb-4">
                                        <button className="btn pl-0"
                                            onClick={() => this.deleteNaver(results.id)}>
                                            <i className="fa fa-trash fa-lg"></i>
                                        </button>
                                        <button className="btn pl-2 ml-1"
                                            onClick={() => this.editNaver(results.id)}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                        </button>
                                    </div>

                                </div>
                            )
                        })}
                        <div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Home
