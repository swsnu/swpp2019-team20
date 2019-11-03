import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Header from '../subcomponents/Header/Header';
import Footer from '../subcomponents/Footer/Footer';


const Base = ({ input }) => (
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
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
