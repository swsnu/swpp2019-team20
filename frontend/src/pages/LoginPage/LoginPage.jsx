import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Link from '@material-ui/core/Link';
import swal from 'sweetalert';
import Base from '../../components/Base/Base';
import Typography from '../../components/subcomponents/Typography';
import AppForm from '../../components/subcomponents/AppForm';
import RFTextField from '../../components/subcomponents/form/RFTextField';
import FormButton from '../../components/subcomponents/form/FormButton';
import { getCookie } from '../../utils';
import { AppContext } from '../../App';

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
  const { onLoggedIn } = useContext(AppContext);

  const classes = useStyles();
  const history = useHistory();


  const onSubmit = async (values) => {
    await fetch('/account/token', {
      method: 'GET',
      credentials: 'include',
    });

    const csrftoken = getCookie('csrftoken');

    const response = await fetch('/account/signin', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(values), // body data type must match "Content-Type" header
    });

    if (response.status === 204) {
      onLoggedIn();
      history.push('/main');
    } else swal('Please check your id or password');
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
                  disabled={submitting}
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
                  disabled={submitting}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
              </div>
              <div id="login-submit-button">
                <FormButton
                  className={classes.button}
                  disabled={submitting}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  Sign In
                </FormButton>
              </div>
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
