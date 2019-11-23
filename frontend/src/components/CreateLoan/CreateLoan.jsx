import React, { useState } from 'react';

/* outlined box */
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
/* date selecter */
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
/* interest switch */
import Switch from '@material-ui/core/Switch';
/* interest input */
import TextField from '@material-ui/core/TextField';
/* selector */
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getCookie } from '../../utils';
// import SearchBar from '../subcomponents/SearchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateLoan = () => {
  const classes = useStyles();
  const history = useHistory();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const DateToString = (date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const [participants, setParticipants] = useState([{ id: 0, paid_money: 0 }]);
  const [deadline, setDeadline] = useState(new Date());
  const [interestValid, setInterestValid] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [interestType, setInterestType] = useState('');
  const [alertFrequency, setAlertFrequency] = useState('');

  /*----------------------------------------*/
  /* used for sending query */

  const triggerLoanPost = async (data) => {
    // console.log(data);
    await fetch('/account/token', {
      method: 'GET',
      credential: 'include',
    });

    const csrftoken = getCookie('csrftoken');

    const response = await fetch('/loan/loan', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      // window.alert("success");
      history.push('/index');
      history.push('/main');
    } else {
      // window.alert('error');
    }
  };

  const articlePostHandler = () => {
    if (participants.length < 2) {
      // window.alert('It needs more participants.');
    } else {
      const data = {
        participants,
        deadline: `${DateToString(deadline)}T23:59:59Z`,
        interest_rate: interestValid ? interestRate : 0,
        interest_type: interestType,
        alert_frequency: alertFrequency,
      };
      triggerLoanPost(data);
    }
  };

  /*----------------------------------------*/
  /* used for changing values */

  const addUser = () => {
    setParticipants([
      ...participants,
      {
        id: 0,
        paid_money: 0,
      },
    ]);
  };
  /*
  ** related to user id **
  const change_user_id = (index, id) => {
    let new_participants = [...participants];
    new_participants[index].id = id;
    setParticipants(new_participants);
  }
  */

  const changeUserMoney = (index, money) => {
    const newParticipants = [...participants];
    newParticipants[index].paid_money = money;
    setParticipants(newParticipants);
  };

  /*----------------------------------------*/
  /* show participants list */

  const participantsList = participants.map(
    (participant, index) => (
      /*
      ** related to user id **
      const setUser = (user) => {
        if (user !== null) {
          //console.log('got user (user id: ' + user.id + ')');
          change_user_id(index, user.id);
        }
      }
      (
      */
      <div key={participant.id}>
        <h3>id: </h3>
        {/*
            ** related to user id **
            <SearchBar setUser={setUser} />
          */}

        <h3>paid money: </h3>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="paid-money"
            label="paid money"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            value={participant.paid_money}
            onChange={(e) => changeUserMoney(index, e.target.value)}
          />
        </form>
      </div>
    )
    ,
  );

  /*----------------------------------------*/
  /* view */

  return (
    <div className="create-loan">
      {participantsList}
      <br />

      <Button variant="outlined" id="add-user-button" className={classes.button} onClick={() => addUser()}>
        Add a participant
      </Button>
      <br />

      <div id="deadline">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="deadline"
              value={deadline}
              onChange={(date) => setDeadline(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <br />

      <h5>interest on/off</h5>
      <div id="interest-valid">
        <Switch
          checked={interestValid}
          onChange={(event) => setInterestValid(event.target.checked)}
          value="interestValid"
          color="primary"
        />
      </div>

      <form className={classes.container} noValidate autoComplete="off">
        <div id="interest-rate">
          <TextField
            label="Interest rate"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            disabled={!interestValid}
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
      </form>

      <div id="interest-type">
        <FormControl className={classes.formControl}>

          <InputLabel shrink id="interest-type-label">
            Interest type
          </InputLabel>

          <Select
            labelId="interest-type-label"
            value={interestType}
            onChange={(event) => setInterestType(event.target.value)}
            displayEmpty
            className={classes.selectEmpty}
            disabled={!interestValid}
          >
            <div id="hour"><MenuItem value="hour">hour</MenuItem></div>
            <div id="day"><MenuItem value="day">day</MenuItem></div>
            <div id="week"><MenuItem value="week">week</MenuItem></div>
            <div id="month"><MenuItem value="month">month</MenuItem></div>
            <div id="year"><MenuItem value="year">year</MenuItem></div>
          </Select>
        </FormControl>
      </div>
      <br />

      <div id="alert-frequency">
        <FormControl variant="outlined" className={classes.formControl}>

          <InputLabel ref={inputLabel} id="alert-frequency-label">
            Alert Frequency
          </InputLabel>

          <Select
            labelId="alert-frequency-label"
            value={alertFrequency}
            onChange={(event) => setAlertFrequency(event.target.value)}
            labelWidth={labelWidth}
          >
            <div id="very-low"><MenuItem value="very low">very low</MenuItem></div>
            <div id="low"><MenuItem value="low">low</MenuItem></div>
            <div id="medium"><MenuItem value="medium">medium</MenuItem></div>
            <div id="high"><MenuItem value="high">high</MenuItem></div>
            <div id="very-high"><MenuItem value="very high">very high</MenuItem></div>
          </Select>
        </FormControl>
      </div>
      <br />

      <div id="register-button">
        <Button className={classes.button} variant="contained" color="primary" onClick={() => articlePostHandler()}>
          Register
        </Button>
      </div>

    </div>
  );
};

export default CreateLoan;