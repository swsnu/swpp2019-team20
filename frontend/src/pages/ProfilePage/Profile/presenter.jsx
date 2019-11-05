import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/subcomponents/Button';
import AppForm from '../../../components/subcomponents/AppForm';

const Presenter = (props) => {
  const {
    username, kakaoId, phone, bio,
  } = props;
  return (
    <AppForm>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <div className="user-profile">
        <h2>
          My Profile
        </h2>
        <div className="media-body">
          <p className="text-secondary">
            <i className="material-icons">face</i>
            <span> </span>
            {username}
          </p>
          <p className="text-secondary">
            <i className="material-icons">
              local_phone
            </i>
            <span> </span>
            {phone}
          </p>
          <p className="text-secondary">
            <i className="material-icons">
              contact_mail
            </i>
            <span> </span>
            {kakaoId}
          </p>
          <p className="text-secondary">
            <i className="material-icons">
              home
            </i>
            <span> </span>
            {bio}
          </p>
        </div>
        <Button>Edit</Button>
      </div>
    </AppForm>
  );
}

Presenter.propTypes = {
  username: PropTypes.string.isRequired,
  kakaoId: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default Presenter;
