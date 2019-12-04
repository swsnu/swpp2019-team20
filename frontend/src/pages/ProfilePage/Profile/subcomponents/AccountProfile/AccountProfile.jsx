import React, { useState, useEffect } from 'react';
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
  Input,
  TextField,
  Paper,
  Box,
} from '@material-ui/core';
import './AccountProfile.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: 'flex',
  },
  information: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2, 2),
  },
}));

const AccountProfile = (props) => {
  const { children, className, ...rest } = props;

  const classes = useStyles();

  const user = {
    avatar: 'http://t1.kakaocdn.net/kakaofriends_global/common/SNS.jpg',
  };
  
  const [edit, setEdit] = useState(false);

  const {
    mine, username, kakao_id: kakaoID, phone, bio, twilio_msg,
  } = children.userInfo;

  const [kakaoIDState, setKakaoIDState] = useState(kakaoID);
  const [phoneState, setPhoneState] = useState(phone);
  const [messageState, setMessageState] = useState(twilio_msg);

  useEffect(() => {
    setKakaoIDState(kakaoID);
    setPhoneState(phone);
    setMessageState(twilio_msg);
  }, [kakaoID !== null, phone !== null, twilio_msg !== null]);

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
            {' '}KakaoTalk:{' '}
            {edit ? (
              <Input
                value={kakaoIDState}
                onChange={(e)=>setKakaoIDState(e.target.value)}
                className={classes.input}
              />
            ) : kakaoIDState}
            <br />

            <PhoneIphoneIcon />
            {' '}Phone:{' '}
            {edit ? (
              <Input
                value={phoneState}
                onChange={(e)=>setPhoneState(e.target.value)}
                className={classes.input}
              />
            ) : phoneState}
          </div>

          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>

        <RecordVoiceOverIcon />
        {' '}Phone message<br />
        {edit ? (
          <TextField
            placeholder="Write a message"
            value={messageState}
            onChange={(e)=>setMessageState(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        ) : (
            <Paper className={classes.paper}>
              <Typography component="p">
                {messageState}
              </Typography>
            </Paper>
          )}

        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>

      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} disabled = {edit} color="primary" variant="text">
          Upload picture
        </Button>
        <Button className={classes.uploadButton} disabled = {edit} variant="text">
          Remove picture
        </Button>
        {mine &&
          (
            edit ? (
              <Button className={classes.uploadButton} variant="contained" onClick={() => setEdit(!edit)}>
                Submit
              </Button>
            ) : (
              <Button className={classes.uploadButton} variant="text" onClick={() => setEdit(!edit)}>
                Edit profile
              </Button>
            )
          )
        }

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
