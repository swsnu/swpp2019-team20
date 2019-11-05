import React from 'react';
import Profile from './Profile/container';
import LoanList from './LoanList/container';
import Base from '../../components/Base/Base';

const ProfilePage = () => {
  const render = (
    <>
      <Profile />
      <LoanList />
    </>
  );
  return render;
}

export default Base(ProfilePage);
