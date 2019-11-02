import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../Typography';

function Copyright() {
  return (
    <fragment>
      ©
      {' '}
      <Link color="inherit" href="https://github.com/swsnu/swpp2019-team20">
        Pay Me Back
      </Link>
      {' '}
      {new Date().getFullYear()}
    </fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#70a1ff',
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
  },
  copyright: {
    margin: 'auto',
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid item className={classes.copyright}>
          <Copyright />
        </Grid>
      </Container>
    </Typography>
  );
}
