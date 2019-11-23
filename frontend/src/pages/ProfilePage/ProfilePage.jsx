import React from 'react';
import Profile from './Profile/container';
import Base from '../../components/Base/Base';
import './ProfilePage.css';
import LoanList from './CompletedLoanList/container';

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
