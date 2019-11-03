import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Header from '../subcomponents/Header/Header';
import Footer from '../subcomponents/Footer/Footer';


function Base(Component) {
  function Base(props) {
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <Component {...props} />
        <Footer />
      </ThemeProvider>
    );
  };

  return Base;
};

export default Base;

/*
const Base = ({ input }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    <div className="page-content">
      {input}
    </div>
    <Footer />
  </ThemeProvider>
);

Base.propTypes = {
  input: PropTypes.object,
};
Base.defaultProps = {
  input: {},
};

export default Base;
*/
