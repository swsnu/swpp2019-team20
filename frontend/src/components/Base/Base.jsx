import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Header from '../subcomponents/Header/Header';
import Footer from '../subcomponents/Footer/Footer';
import SearchBar from '../subcomponents/SearchBar/SearchBar';


function Base(Component) {
  const setUser = () => 'user';

  function BaseBase(props) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header>
          <SearchBar setUser={setUser} />
        </Header>
        <Component {...props} />
        <Footer />
      </ThemeProvider>
    );
  }

  return BaseBase;
}

export default Base;
