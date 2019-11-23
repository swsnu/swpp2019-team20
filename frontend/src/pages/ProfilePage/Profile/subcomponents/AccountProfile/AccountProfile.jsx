import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MessageIcon from '@material-ui/icons/Message';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@material-ui/core';
import './AccountProfile.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = (props) => {
  const { children, className, ...rest } = props;

  const classes = useStyles();

  const user = {
    avatar: 'http://t1.kakaocdn.net/kakaofriends_global/common/SNS.jpg'
  };

  const {
    username, kakao_id: kakaoID, phone, bio,
  } = children.userInfo;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {username}
            </Typography>
            <MessageIcon />
            {' '}
            KakaoTalk:
            {
              kakaoID
            }
            <br />
            <PhoneIphoneIcon />
            {' '}
            Phone:
            {
              phone
            }
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <Typography variant="body2">
          <RecordVoiceOverIcon />
          {' '}
          {
            bio
          }
        </Typography>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={90}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

AccountProfile.defaultProps = {
  className: null,
  children: null,
};

export default AccountProfile;
