import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import AppForm from '../../../components/subcomponents/AppForm';
import CompletedLoans from '../components/CompletedLoans/CompletedLoans';


const Presenter = (props) => {
  const {
    loanlist
  } = props;
  return (
    <Grid
      item
      lg={10}
      sm={10}
      xl={10}
      xs={12}
      justify="center"
      alignItems="center"
    >
      <CompletedLoans>
        {loanlist}
      </CompletedLoans>
    </Grid>
  );
}

Presenter.propTypes = {
  loanlist: PropTypes.string.isRequired,
};

export default Presenter;
