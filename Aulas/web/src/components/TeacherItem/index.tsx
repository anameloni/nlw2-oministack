import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './style.css';

function TeacherItem () {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFAHI4iAGXZdA/profile-displayphoto-shrink_200_200/0?e=1602720000&v=beta&t=MUSCYSslRYs3Rb6H6HgLjdD4beIOKN3kdMgGoMl0U0A" alt="Ana Luiza Meloni"/>
                <div>
                    <strong>Ana Luiza Meloni Dias</strong>
                    <span>Análise de Negócios</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores ferramentas para análise de BI.
                <br/><br/>
                Apaixonado por transformar dados em informação e por mudar a vida das emresas através da implantação de modelos de gestão integrada. Mais de 10 anos de experiência em pequenas, médias e grandes empresas. Vamos mudar a forma como os seus gestores olham para o mercado e, consequentemente, seus clientes vão mudar a forma como olham para sua empresa.
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 120,00</strong>
                </p>
                <button type='button'>
                    <img src={whatsappIcon} alt="WhatsApp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
};

export default TeacherItem;