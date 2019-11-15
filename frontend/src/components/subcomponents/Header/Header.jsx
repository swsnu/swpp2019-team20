import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../AppBar';
import Toolbar, { styles as toolbarStyles } from '../ToolBar';
import { AppContext } from '../../../App';
import './Header.css';
import logo from './logo.png';

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function Header(props) {
  const { user } = useContext(AppContext);
  const { classes } = props;

  let label1 = (
    <Link
      color="inherit"
      variant="h6"
      underline="none"
      className={classes.rightLink}
      href="/signin/"
    >
      Sign In
    </Link>
  );
  let label2 = (
    <Link
      variant="h6"
      underline="none"
      className={clsx(classes.rightLink, classes.linkSecondary)}
      href="/signup/"
    >
      Sign Up
    </Link>
  );
  if (user.loggedIn) {
    label1 = (
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        className={classes.rightLink}
        href="/signin/"
      >
        Sign Out
      </Link>
    );
    label2 = (
      <Link
        variant="h6"
        underline="none"
        className={clsx(classes.rightLink, classes.linkSecondary)}
        href="/profile/"
      >
        My Page
      </Link>
    );
  }


  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <span className="logoContainer">
            <a href="/">
              <img className="logo" src={logo} alt="logo" />
            </a>
          </span>
          <div className={classes.left}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/"
            >
              <span className="pageTitle">Pay Me Back</span>
            </Link>
          </div>
          <div className={classes.right}>
            {label1}
            {label2}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object,
};
Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
