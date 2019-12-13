import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, Grid, Typography, Avatar,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
}));

const TotalMoney = (props) => {
  const { children, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              START CHATTING
            </Typography>
          </Grid>
          <Grid item>
            {children}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalMoney.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

TotalMoney.defaultProps = {
  className: null,
  children: null,
};

export default TotalMoney;
