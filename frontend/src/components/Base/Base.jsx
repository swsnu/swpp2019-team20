import React from 'react';
import PropTypes from 'prop-types';
import Header from '../subcomponents/Header/Header';
import Footer from '../subcomponents/Footer/Footer';


const Base = ({ input }) => (
  <div>
    <Header />
    <div className="page-content">
      {input}
    </div>
    <Footer />
  </div>
);

Base.propTypes = {
  input: PropTypes.element,
};
Base.defaultProps = {
  input: {},
};

export default Base;
