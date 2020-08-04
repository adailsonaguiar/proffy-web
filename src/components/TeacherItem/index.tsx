import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars2.githubusercontent.com/u/19656546?s=460&u=1670b315054f11b9f359b226711ec53fe927c524&v=4"
          alt="Adailson Aguiar"
        />
        <div>
          <strong>Adailson Aguiar</strong>
          <span>Química</span>
        </div>
      </header>
      <p>
        I'm a software developer that loves to work with challenging and
        creative projects.
      </p>
      <footer>
        <p>
          Preço/hora <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Ícone whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeeacherItem;
