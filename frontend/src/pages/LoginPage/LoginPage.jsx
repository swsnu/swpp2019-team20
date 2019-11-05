import React, { useState, useEffect } from 'react';
import jQuery from 'jquery';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Base from '../../components/Base/Base';
import Typography from '../../components/subcomponents/Typography';
import AppForm from '../../components/subcomponents/AppForm';
import { email, required } from '../../components/subcomponents/form/validation';
import RFTextField from '../../components/subcomponents/form/RFTextField';
import FormButton from '../../components/subcomponents/form/FormButton';
import FormFeedback from '../../components/subcomponents/form/FormFeedback';
import CSRFToken from '../../components/subcomponents/csrftoken';


const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));


function LoginPage() {
  const classes = useStyles();
  const [sent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  /*let data = {
    'file': file,
    'fileName': file.name,
  };
  let csrftoken = getCookie('csrftoken');
  let response = fetch("/upload/", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { "X-CSRFToken": csrftoken },
  })*/

  // The following function are copying from
  // https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
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

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async values => {
    let before_csrftoken = getCookie('csrftoken');
    console.log(before_csrftoken);
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));

    await fetch('/account/token', {
      method: 'GET',
      credential: 'include',
    });

    let csrftoken = getCookie('csrftoken');
    console.log(csrftoken);

    const response = await fetch('/account/signin', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(values) // body data type must match "Content-Type" header
    });

    if (response.status !== 204) {
      window.alert("error");
    } else {
      window.alert("success");
    }
  };

  return (
    <fragment>
      <AppForm>
        <fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            Not a member yet?
            <Link href="/signup/" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </fragment>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <div id="login-username-input">
                <Field
                  autoComplete="username"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Username"
                  margin="normal"
                  name="username"
                  required
                  size="large"
                />
              </div>
              <div id="login-password-input">
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
              </div>
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) => (submitError ? (
                  <FormFeedback className={classes.feedback} error>
                    {submitError}
                  </FormFeedback>
                ) : null)}
              </FormSpy>
              <CSRFToken />
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </fragment>
  );
}

export default Base(LoginPage);
