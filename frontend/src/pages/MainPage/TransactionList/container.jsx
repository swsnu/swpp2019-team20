import React, { useState, useEffect } from 'react';
import LatestOrders from './presenter';
import { getCookie } from '../../../utils';

const TransactionList = (props) => {
  const { loan } = props;
  const [username, setUsername] = useState(1);
  const [TxList, setTxList] = useState([]);
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [isLoading, setLoading] = useState(true);

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

    if (response.status === 403) alert('not your transaction! ;_;');
    else {
      alert('confirm! :)');
      setBtnDisabled(true);
      if (tx.lender === username) onWriteReivew();
    }
    setLoading(true);
  };

  const onWriteReivew = async () => {
    const temp = prompt('리뷰를 작성하세요.')
    if (temp === null || temp.length === 0) {
      alert('리뷰를 작성하지 않으셨습니다. 마이페이지에서 완료하세요!')
    } else {
      await fetch('/account/token', {
        method: 'GET',
        credentials: 'include',
      });
      const csrftoken = getCookie('csrftoken');

      const targetUrl = '/review';
      const response = await fetch(targetUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({content: temp}), // body data type must match "Content-Type" header
      });
      setLoading(true)
    }
  }

  const render = (
    <LatestOrders
      TxList={TxList}
      onClickBtn={confirm}
      isBtnDisabled={isBtnDisabled}
      username={username}
    />
  );
  return render;
};

export default TransactionList;
