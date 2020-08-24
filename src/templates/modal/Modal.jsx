import React, { Component } from 'react';
import './Modal.css'

class Modal extends Component {
    state = {
        visivel: "invisivel",
        criacaoTitulo: '',
        criacaoSubTitulo: ''
    }
    componentWillReceiveProps(prevPros) {
        const {criacaoTitulo, visivel, criacaoSubTitulo} = prevPros
        this.setState({
            ...this.state,
            visivel,
            criacaoSubTitulo,
            criacaoTitulo
        })
    }
    close(){
        this.setState({ visivel: "invisivel" })
        window.location.reload(true)
    }

    renderAlert() {
        return (
            <div>
                <div id= "modal" className={this.state.visivel}>
                    <div className="bg-modal">
                        <div className="conteudo-modal">
                            <div className="head-modal ">
                                <div className="col-6 ">
                                    <h2>{this.state.criacaoTitulo}</h2>
                                </div>
                                <div className="col-6 btn-close">
                                    <button id="close" className="btn"
                                    onClick={() => this.close()}>
                                        <i className="fa fa-times fa-lg" />
                                    </button>
                                </div>
                            </div>
                            <div className="body-modal">
                                <p>{this.state.criacaoSubTitulo}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
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

export default Modal;