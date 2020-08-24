import React, { Component } from 'react';
import './Home.css'
import Nav from './Nav';
import Header from './Header';

import axios from 'axios';
import ModalExcluir from './modal/ModalExcluir';
import ModalNaver from './modal/ModalNaver';

const baseUrl = 'https://navedex-api.herokuapp.com/v1/navers'

class Home extends Component {
    state = {
        visivel: "invisivel-naver",
        visivelExcluir: "invisivel-excluir",
        id: '',
        list: []
    }
    async componentDidMount() {
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
            await this.axiosApi(config)
        }
    }

    async axiosApi(config) {
        await axios(baseUrl, config)
            .then(resp => {
                this.setState({ ...this.state, list: resp.data })
            }).catch(error => {
                alert('não foi carregado')
            })
    }
    deleteNaver() {
        this.setState({
            ...this.state,
            visivelExcluir: null

        })
    }
    async showNave(event) {
        await this.setState({
            ...this.state,
            visivel: null,
            id: event.currentTarget.id
        })
    }
    editNaver(e){
        this.props.history.push(`/editar/${e}`)
    }
    render() {
        const result = this.state.list
        return (

            <div>
                <Header />
                <Nav />
                <ModalExcluir visivel={this.state.visivelExcluir} />
                {/* <ModalNaver visivel={this.state.visivel} */}
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
                                            onClick={() => this.deleteNaver()}>
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

            </div >
        );
    }
}

export default Home;
