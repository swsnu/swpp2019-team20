import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Footer from '../subcomponents/Footer/Footer';
import Header from '../subcomponents/Header/Header';
import SearchBar from '../subcomponents/SearchBar/SearchBar';


function Base(Component) {
  function BaseBase(props) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header>
          <SearchBar />
        </Header>
        <Component {...props} />
        <Footer />
      </ThemeProvider>
    );
  }

  return BaseBase;
}

export default Base;
