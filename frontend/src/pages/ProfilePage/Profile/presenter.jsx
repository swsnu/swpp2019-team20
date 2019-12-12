import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AccountProfile from './subcomponents/AccountProfile/AccountProfile';
import Rating from "../Rating/container";

const Presenter = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(4),
    },
  }));

  const classes = useStyles();
  const creditRating = require('../Rating/rating.gif');

  return (
    <>
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justify="center"
          alignContent='center'
        >
          <Grid
            item
            lg={1}
            md={6}
            xl={1}
            xs={12}
          />
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
            xl={1.5}
            xs={12}
          />
          <Grid
            item
            lg={7}
            md={6}
            xl={6.5}
            xs={12}
          >
            <div style={{
              display: 'flex',
              margin: 10,
            }}
            >
              {/* eslint-disable */}
              <img src={creditRating} style={{blockSize: 50}}/>
            </div>
            <Rating/>
          </Grid>
        </Grid>
      </div>
    </>
  )
    ;
};

export default Presenter;
