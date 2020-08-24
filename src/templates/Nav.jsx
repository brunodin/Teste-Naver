import React from 'react';
import './Nav.css'
import {Link} from 'react-router-dom';

const props = () => {
    return (
        <section className="conteudo mt-5">
            <nav className="conteudo-top">
                <div className="row">
                    <div className="col-6 text-naver">
                        <span>Navers</span>
                    </div>
                    <div className="col-6 btn-add">
                        <Link to="adicionar"><button id="btn-addnaver" className="btn text-white">
                            Adicionar Naver</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default props;
