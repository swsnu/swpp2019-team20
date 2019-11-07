import React, { useState } from 'react';
import SearchBar from '../../subcomponents/SearchBar/SearchBar';

/*outlined box*/
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
/* date selecter */
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/* interest switch */
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const CreateLoan = () => {
  const classes = useStyles();

  const getDate = () => {
    var today = new Date();
    return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  }

  const [participants, setParticipants] = useState([{ id: 0, paid_money: 0 }]);
  const [deadline, setDeadline] = useState(getDate());
  const [interestValid, setInterestValid] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [interestRate, setInterestRate] = useState(0);
  const [interestType, setInterestType] = useState('hour');
  const [alertFrequency, setAlertFrequency] = useState('very low');

  /*----------------------------------------*/
  /* used for sending query */
  const articlePostHandler = () => {
    let errorMessage = '';
    if (participants.length < 2) errorMessage += '\nIt needs more participants.';
    if (interestValid && interestRate === 0) errorMessage += '\nWrite interest rate or disable it.';

    if (errorMessage === '') {
      const data = {
        'participants': participants,
        'deadline': deadline + 'T23:59:59Z',
        'interest_rate': interestValid ? interestRate : 0,
        'interest_type': interestType,
        'alert_frequency': alertFrequency,
      }
      triggerLoanPost(data);
    } else {
      window.alert(errorMessage);
    }
  }

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const triggerLoanPost = async (data) => {
    console.log(data);
    await fetch('/account/token', {
      method: 'GET',
      credential: 'include',
    });

    let csrftoken = getCookie('csrftoken');

    const response = await fetch('/loan/loan', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      window.alert("error");
    } else {
      window.alert("success");
    }
  };

  /*----------------------------------------*/
  /* used for changing values */


  const add_user = () => {
    setParticipants([
      ...participants,
      {
        id: 0,
        paid_money: 0,
      }
    ]);
  };

  const change_user_money = (index, money) => {
    let new_participants = [...participants];
    new_participants[index].paid_money = money;
    setParticipants(new_participants);
  }

  const change_user_id = (index, id) => {
    let new_participants = [...participants];
    new_participants[index].id = id;
    setParticipants(new_participants);
  }

  const handleDeadlineChange = date => {
    setDeadline(date);
  };

  const handleChange = name => event => {
    setInterestValid({ ...interestValid, [name]: event.target.checked });
  };

  /*----------------------------------------*/
  /* show participants list */

  const participants_list = participants.map(
    (participant, index) => {
      let rating;
      const setUser = (user) => {
        if (user !== null) {
          console.log(user.id);
          rating = user.rating;
          change_user_id(index, user.id);
        }
      }
      return (
        <div>
          id: <SearchBar setUser={setUser} />
          paid money: <input className='paid_money' type='number' value={participant.paid_money} onChange={(e) => change_user_money(index, e.target.value)} />
          rating: <h3 className='rating'>{rating}</h3>
        </div>
      )
    }
  )

  /*----------------------------------------*/
  /* view */

  return (
    <div className="create-loan">
      {participants_list}
      <br />


      <Button variant="outlined" className={classes.button} onClick={() => add_user()}>
        Add a participant
      </Button>
      <br />

      Deadline<br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={deadline}
            onChange={handleDeadlineChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <br />

      <h3>Options</h3>
      <br />

      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={interestValid.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
      </FormGroup>

      <label>
        Interest
        <input className="interest_valid" type="checkbox" checked={interestValid} onChange={(e) => setInterestValid(e.target.value)} />
        Rate:
        <input className="interest_rate" type="number" disabled={!interestValid} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
        %
        <select className="interest_type" disabled={!interestValid} value={interestType} onChange={(e) => setInterestType(e.target.value)}>
          <option value="hour">hour</option>
          <option value="day">day</option>
          <option value="week">week</option>
          <option value="month">month</option>
          <option value="year">year</option>
        </select>
      </label>
      <br />

      Alert frequency
      <select className="alert_frequency" value={alertFrequency} onChange={(e) => setAlertFrequency(e.target.value)}>
        <option value="very low">very low</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
        <option value="very high">very high</option>
      </select>
      <br />

      <button className="register-loan" onClick={() => articlePostHandler()}>Register</button>
      <br />
    </div>
  )

}

export default CreateLoan;
