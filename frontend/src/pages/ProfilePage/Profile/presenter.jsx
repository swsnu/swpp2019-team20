import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Button from '../../../components/subcomponents/Button';
import AppForm from '../../../components/subcomponents/AppForm';
import AccountProfile from './components/AccountProfile/AccountProfile';
import AccountDetails from './components/AccountDetails/AccountDetails';

const Presenter = (props) => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4)
    }
  }));

  const {
    username, kakaoId, phone, bio,
  } = props;

  const classes = useStyles();

  return (
    <>
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile>
            {props}
          </AccountProfile>
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails>
            {props}
          </AccountDetails>
        </Grid>
      </Grid>
    </div>
    </>
  );
}

Presenter.propTypes = {
  username: PropTypes.string.isRequired,
  kakaoId: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default Presenter;
