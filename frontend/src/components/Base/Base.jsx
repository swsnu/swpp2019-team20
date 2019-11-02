import React from 'react';
import PropTypes from 'prop-types';
import Header from '../subcomponents/Header/Header';
import Footer from '../subcomponents/Footer/Footer';


const Base = ({ input }) => {
  return (
    <div>
      <Header />
      <div>
        {input}
      </div>
      <Footer />
    </div>
  );
};

Base.propTypes = {
  input: PropTypes.element,
};

export default Base;
