import React, { useState, useEffect } from 'react';
import LatestOrders from './presenter';
import { getCookie } from '../../../utils';

const TransactionList = (props) => {
  const { loan } = props;
  const [username, setUsername] = useState(1);
  const [TxList, setTxList] = useState([]);
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState('');
  const [disable, setDisable] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const onWriteReview = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const loanId = loan.id;
    const targetUrl = `/loan/loan-transaction/${loanId}`;
    const fetchTransactionList = async () => {
      const res = await fetch(targetUrl, {
        method: 'GET',
        credential: 'include',
      });
      const curTxList = await res.json();
      setTxList(curTxList);
    };

    const url = '/account/user/me';
    const fetchProfile = async () => {
      const res = await fetch(url, {
        method: 'GET',
        credential: 'include',
      });
      const info = await res.json();
      setUsername(info.username);
    };

    fetchProfile();
    fetchTransactionList();
    setLoading(false);
  }, [isLoading]);

  const confirm = async (tx) => {
    await fetch('/account/token', {
      method: 'GET',
      credentials: 'include',
    });

    const csrftoken = getCookie('csrftoken');
    const targetUrl = `/loan/transaction/${tx.id}`;
    const content = { confirm: true };
    const response = await fetch(targetUrl, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(content), // body data type must match "Content-Type" header
    });

    // eslint-disable-next-line
    if (response.status === 403) alert('not your transaction! ㅜ.ㅜ');
    else {
      setBtnDisabled(true);
      if (tx.lender === username) onWriteReview();
    }
    setLoading(true);
  };

  const handleChange = async (e) => {
    const r = e.target.value;
    setReview(r);
    if (r.length !== 0) setDisable(false);
  };

  const onSubmit = async (tx) => {
    setIsOpen(false);
    await fetch('/account/token', {
      method: 'GET',
      credentials: 'include',
    });
    const csrftoken = getCookie('csrftoken');

    const revieweeId = tx.borrower_id;
    const targetUrl = `/review/${revieweeId}/`;
    await fetch(targetUrl, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include', // include, *same-origin, omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ content: review }), // body data type must match "Content-Type" header
    });
  };

  const render = (
    <LatestOrders
      TxList={TxList}
      onClickBtn={confirm}
      isBtnDisabled={isBtnDisabled}
      username={username}
      popUp={isOpen}
      review={review}
      handleChange={handleChange}
      onSubmit={onSubmit}
      isDisable={disable}
    />
  );
  return render;
};


export default TransactionList;
