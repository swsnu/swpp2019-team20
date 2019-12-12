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
} from '@material-ui/core';
import { getCookie } from '../../../../../utils';
import './AccountProfile.css';

import ImageUpload from '../../../ImageUpload/ImageUpload';

const useStyles = makeStyles((theme) => ({
  root: { 
    width: 510,
  },
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
    width: 150,
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2, 2),
  },
}));

const AccountProfile = (props) => {
  const { children, className, ...rest } = props;

  const classes = useStyles();

  /*
  const user = {
    avatar: 'http://t1.kakaocdn.net/kakaofriends_global/common/SNS.jpg',
  };
  */

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(false);

  const {
    mine, id, username, profile_img, kakao_id: kakaoID, phone, bio, twilio_msg: twilioMsg,
  } = children.userInfo;

  const [kakaoIDState, setKakaoIDState] = useState(kakaoID);
  const [phoneState, setPhoneState] = useState(phone);
  const [messageState, setMessageState] = useState(twilioMsg);

  useEffect(() => {
    setKakaoIDState(kakaoID);
    setPhoneState(phone);
    setMessageState(twilioMsg);
  }, [kakaoID, phone, twilioMsg, profile_img]);

  /* --- submit changes --- */

  const triggerProfilePost = async (data) => {
    // console.log(data);
    await fetch('/account/token', {
      method: 'GET',
      credential: 'include',
    });

    const csrftoken = getCookie('csrftoken');

    const response = await fetch(`/account/user/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      // eslint-disable-next-line
      window.alert('profile change success');
    } else {
      // eslint-disable-next-line
      window.alert('profile change error');
    }
  };

  const profilePostHandler = () => {
    const data = {
      kakao_id: kakaoIDState,
      phone: phoneState,
      bio,
      twilio_msg: messageState,
    };
    triggerProfilePost(data);
  };

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

            <div className="kakaoID">
              <MessageIcon />
              {' '}
            KakaoTalk:
              {' '}
              {edit ? (
                <Input
                  value={kakaoIDState}
                  onChange={(e) => setKakaoIDState(e.target.value)}
                  className={classes.input}
                />
              ) : kakaoIDState}
            </div>

            <div className="phone">
              <PhoneIphoneIcon />
              {' '}
            Phone:
              {' '}
              {edit ? (
                <Input
                  value={phoneState}
                  onChange={(e) => setPhoneState(e.target.value)}
                  className={classes.input}
                />
              ) : phoneState}
            </div>
          </div>

          <Avatar
            className={classes.avatar}
            src={profile_img}
          />
        </div>

        <RecordVoiceOverIcon />
        {' '}
        Phone message
        <br />
        {edit ? (
          <div className="message">
            <TextField
              placeholder="Write a message"
              value={messageState}
              onChange={(e) => setMessageState(e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>
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
        <Button className={classes.uploadButton} disabled={edit} color="primary" onClick={() => setImage(!image)} variant="text">
          {image ? "Cancel" : "Upload picture"}
        </Button>
        <Button className={classes.uploadButton} disabled={edit || image} variant="text">
          Remove picture
        </Button>

        {/* edit profile & submit button: only visible on my profile page */}
        {mine
          && (
            edit ? (
              <div className="submit-button">
                <Button className={classes.uploadButton} variant="contained" onClick={() => { setEdit(!edit); profilePostHandler(); }}>
                  Submit
                </Button>
              </div>
            ) : (
              <div className="edit-button">
                <Button className={classes.uploadButton} disabled={image} variant="text" onClick={() => setEdit(!edit)}>
                    Edit profile
                </Button>
              </div>
            )
          )}
      </CardActions>

      {image && <div>
        <Divider />

        <Card>
          <ImageUpload userID = {id}/>
        </Card>
      </div>}


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
