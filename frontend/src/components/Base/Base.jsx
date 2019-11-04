import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Header from '../subcomponents/Header/Header';
import Footer from '../subcomponents/Footer/Footer';


function Base(Component) {
  function BaseBase(props) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...props} />
        <Footer />
      </ThemeProvider>
    );
  }

  return BaseBase;
}

export default Base;
