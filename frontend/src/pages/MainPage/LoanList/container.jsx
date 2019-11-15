import React, { useState, useEffect } from 'react';
import SimpleTabs from './presenter';

const LoanList = () => {
  const [completedLoanList, setCompletedLoanList] = useState([]);
  const [notCompletedLoanList, setNotCompletedLoanList] = useState([]);

  const targetUrl = '/loan/loan';
  const fetchLoanList = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    });
    const loanRawList = await res.json();
    const curCompletedLoanList = loanRawList.filter((loan) => loan.completed === true);
    const curNotCompletedLoanList = loanRawList.filter((loan) => loan.completed === false);
    setCompletedLoanList(curCompletedLoanList);
    setNotCompletedLoanList(curNotCompletedLoanList);
  };

  useEffect(() => {
    fetchLoanList();
  }, []);

  const render = (
    <SimpleTabs notCompletedLoanList={notCompletedLoanList} completedLoanList={completedLoanList} />
  );
  return render;
};

export default LoanList;
