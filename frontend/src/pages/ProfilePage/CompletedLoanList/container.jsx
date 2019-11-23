import React, { useState, useEffect } from 'react';
import Presenter from './presenter';

const LoanList = () => {
  const [completedLoanList, setCompletedLoanList] = useState([]);

  const targetUrl = '/loan/loan';
  const fetchLoanList = async () => {
    const res = await fetch(targetUrl, {
      method: 'GET',
      credential: 'include',
    })
    const loanRawList = await res.json()
    const curCompletedLoanList = loanRawList.filter((loan) => loan.completed === true)
    setCompletedLoanList(curCompletedLoanList);
  };

  useEffect(() => {
    fetchLoanList();
  }, []);

  const render = (
    <Presenter loanlist={completedLoanList} />
  );
  return render;
};

export default LoanList;
