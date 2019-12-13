import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountProfile from './subcomponents/AccountProfile/AccountProfile';
import Rating from '../Rating/container';
import LoanList from '../CompletedLoanList/container';
import ReviewList from '../ReviewList/container';

const Presenter = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(4),
    },
  }));

  const classes = useStyles();
  /* eslint-disable global-require */
  const creditRating = require('../Rating/rating.gif');

  return (
    <>
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <AccountProfile>
              {props}
            </AccountProfile>
          </Grid>
          <Grid
            item
            lg={1}
            md={6}
            xl={1}
            xs={12}
          />
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <div style={{
              display: 'flex',
              marginTop: 10,
              marginBottom: 20,
              marginLeft: 10,
              marginRight: 10,
            }}
            >
              {/* eslint-disable */}
              <img src={creditRating} style={{blockSize: 50}}/>
            </div>
            <Rating/>
            <div style={{padding: '40px'}}/>
            <LoanList/>
            <div style={{padding: '30px'}}/>
            <ReviewList/>
          </Grid>
        </Grid>
      </div>
    </>
  )
    ;
};

export default Presenter;
