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
            <Rating/>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Presenter;
