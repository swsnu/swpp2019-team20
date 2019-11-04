import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Typography from '../Typography';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  error: {
    backgroundColor: theme.palette.error.xLight,
    color: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[50],
    color: green[700],
  },
});

function FormFeedback(props) {
  return (
    <div
      className={clsx(
        props.classes.root,
        { [props.classes.error]: props.error, [props.classes.success]: props.success },
        props.className,
      )}
    >
      <Typography color="inherit">{props.children}</Typography>
    </div>
  );
}

FormFeedback.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
};
FormFeedback.defaultProps = {
  children: {},
  className: '',
  error: false,
  success: false,
};

export default withStyles(styles)(FormFeedback);
