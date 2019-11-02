import React from 'react';
import Header from '../subcomponents/Header/Header';
import Footer from '../subcomponents/Footer/Footer';

const Base = ({input}) => {
  return (
    <div>
      <Header></Header>
      <div>
        <div>Something like Header</div>
        {input}
        <div>Base Page</div>
      </div>
      <Footer></Footer>
    </div>
  );
};


export default Base;
