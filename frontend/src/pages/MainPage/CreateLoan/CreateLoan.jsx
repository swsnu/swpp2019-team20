import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
/* outlined box */
import { makeStyles } from '@material-ui/core/styles';
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
import swal from 'sweetalert';
import { getCookie } from '../../../utils';
import SearchBar from '../../../components/subcomponents/SearchBar/SearchBar';

import './CreateLoan.css';

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
  const [interestType, setInterestType] = useState('day');
  const [alertFrequency, setAlertFrequency] = useState('medium');

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
      swal('Good job!', 'Your loan is registered.', 'success')
        .then(() => window.location.reload());
    } else {
      swal('Cannot register the loan. Please contact with the administers.');
    }
  };

  const articlePostHandler = () => {
    const all = participants.length;
    let real = 0;
    const realParticipants = [];

    for (let i = 0; i < all; i += 1) {
      const currentID = participants[i].id;
      // currentID < 0 : do nothing
      if (currentID === 0) {
        swal(`username on row ${real + 1} is empty!`);
        return;
      }

      if (currentID > 0) {
        let exist = false;

        for (let p = 0; p < real; p += 1) {
          if (realParticipants[p].id === currentID) {
            realParticipants[p].paid_money += participants[i].paid_money;
            exist = true;
            break;
          }
        }

        if (!exist) {
          realParticipants.push(participants[i]);
          real += 1;
        }
      }
    }

    if (real < 2) {
      swal('It needs more participants.');
    } else {
      const data = {
        participants: realParticipants,
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

  const changeUserId = (index, id) => {
    const newParticipants = [...participants];
    newParticipants[index].id = id;
    setParticipants(newParticipants);
  };

  const deleteUser = (index) => {
    changeUserId(index, -1);
  };

  const changeUserMoney = (index, money) => {
    const newParticipants = [...participants];
    newParticipants[index].paid_money = money;
    setParticipants(newParticipants);
  };

  /*----------------------------------------*/
  /* show participants list */

  const participantsList = participants.map(
    (participant, index) => {
      const setUser = (user) => {
        if (user !== null) {
          changeUserId(index, user.id);
        }
      };

      if (participant.id < 0) return <div />;

      return (
        // eslint-disable-next-line
        <div>
          <div className="delete-button participants">
            <CloseIcon style={{ fontSize: 20 }} onClick={() => deleteUser(index)} />
          </div>

          <div className="participant participants">
            <SearchBar setUser={setUser} />
          </div>

          <div className="paid-money participants">
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
                onChange={(e) => changeUserMoney(index, Number(e.target.value))}
              />
            </form>
          </div>
        </div>
      );
    },
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

      <div className="deadline">
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

      <div className="alert-frequency">
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
            <MenuItem value="very low">very low</MenuItem>
            <MenuItem value="low">low</MenuItem>
            <MenuItem value="medium">medium</MenuItem>
            <MenuItem value="high">high</MenuItem>
            <MenuItem value="very high">very high</MenuItem>
          </Select>
        </FormControl>
      </div>
      <br />

      <div className="interest-valid">
        <h5>interest on/off</h5>
        <Switch
          checked={interestValid}
          onChange={(event) => setInterestValid(event.target.checked)}
          value="interestValid"
          color="primary"
        />
      </div>

      <div className="interest-rate">
        <form className={classes.container} noValidate autoComplete="off">
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
        </form>
      </div>

      <div className="interest-type">
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
            <MenuItem value="hour">hour</MenuItem>
            <MenuItem value="day">day</MenuItem>
            <MenuItem value="week">week</MenuItem>
            <MenuItem value="month">month</MenuItem>
            <MenuItem value="year">year</MenuItem>
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
