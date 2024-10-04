// src/Components/Loading/Loading.js
import React from 'react';
import { PulseLoader } from 'react-spinners';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading">
            <img src='./img/store.png' alt='store'/>
      <PulseLoader size={20} color={"black"} loading={true} />
    </div>
  );
};

export default Loading;
