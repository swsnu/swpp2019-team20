import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Toolbar, { styles as toolbarStyles } from '../ToolBar';
import { AppContext } from '../../../App';
import logo from './logo.png';
import './Header.css';


const drawerWidth = 430;

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
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
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

// eslint-disable-next-line
export default function Header({ children }) {
  const { user } = useContext(AppContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = async () => {
    await fetch('/account/signout', {
      method: 'GET',
      credentials: 'include',
    });
  };

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
      <div id="signOutButton">
        <Link
          color="inherit"
          variant="h6"
          underline="none"
          className={classes.rightLink}
          href="/index/"
          onClick={onLogout}
        >
          Sign Out
        </Link>
      </div>
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
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div id="nav-icon">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </div>
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
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <h3>Who Are You Looking For?</h3>
        <Divider />
        <div className="searchBarContainer">
          {children}
        </div>
      </Drawer>
      <div className={classes.placeholder} />
    </div>
  );
}

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);
