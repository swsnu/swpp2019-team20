import React, { useState, useEffect } from 'react';
import Presenter from './presenter';

const LoanList = () => {
  // Loan
  // const [loanlist, setLoanlist] = useState("");
  const [isLoading, setLoading] = useState(true);

  const LoanListTargetUrl = '/loan/loan';
  const fetchLoanList = async () => {
    const res = await fetch(LoanListTargetUrl, {
      method: 'GET',
      credential: 'include',
    })
    const loanRawList = await res.json();
    const completedLoanList = loanRawList.filter(
      (loan) => loan.completed === true,
    );
    completedLoanList.map((loan) => console.log(loan));
    // const loanListDict = JSON.parse(completedLoanList[0]);
    // console.log(loanListDict)
    // const {
    //  completed,
    // } = loanListDict;
    // console.log(completed);
    setLoading(false);
  }

  useEffect(() => {
    fetchLoanList();
  }, [isLoading]);

  const render = (
    <Presenter />
  );
  return render;
};

export default LoanList;
