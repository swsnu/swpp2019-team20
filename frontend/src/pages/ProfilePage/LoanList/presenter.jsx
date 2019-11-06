import React from 'react';
import PropTypes from 'prop-types';
import AppForm from '../../../components/subcomponents/AppForm';

const Presenter = (props) => {
  const {
    loanlist
  } = props;
  return (
    <AppForm>
      <h2>MY COMPELETED LOAN LIST</h2>
      <LoanList list={loanlist} />
    </AppForm>
  );
}

const LoanList = ({list}) => <ul>{list.map((loan) => (<li key={loan.id}><h3>Loan {loan.id}</h3>
  <div>
    {
      Object.keys(loan).map((key, index) => (key !== 'completed' ? (key !== 'apply_interest' ? (
          <p key={index}> {key}: {loan[key]}</p>) : <p/>) : <p/>
      ))
    }
  </div>
</li>))}</ul>

Presenter.propTypes = {
  loanlist: PropTypes.string.isRequired,
};

export default Presenter;
