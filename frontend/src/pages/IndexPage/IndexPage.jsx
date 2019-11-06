import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Base from '../../components/Base/Base';

import Button from '../../components/subcomponents/Button';
import Typography from '../../components/subcomponents/Typography';
import IndexPageLayout from './IndexPageLayout';


const backgroundImage =
  //'https://images.pexels.com/photos/1037912/pexels-photo-1037912.jpeg?cs=srgb&dl=bitcoin-blockchain-coin-1037912.jpg&fm=jpg';
  //'https://cdn.pixabay.com/photo/2018/02/20/10/28/business-3167295_960_720.jpg';
  'https://images.pexels.com/photos/462383/pexels-photo-462383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function IndexPage(props) {
  const { classes } = props;

  return (
    <fragment>
      <IndexPageLayout backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Get Your Money Back
      </Typography>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
          You don't need to feel awkward to say "GIVE MY MONEY BACK!" <br/>
          We will take care of it instead of you.
      </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="a"
          href="/signup/"
        >
          Register
      </Button>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Discover the experience
      </Typography>
      </IndexPageLayout>
    </fragment>
  );
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Base(withStyles(styles)(IndexPage));
