import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const Presenter = (props) => {
  const {
    reviewList,
  } = props;
  return (
    <Grid
      item
      lg={12}
      sm={10}
      xl={12}
      xs={12}
      justify="center"
      alignItems="center"
    >
      <Completedloans>
        {reviewList}
      </Completedloans>
    </Grid>
  );
};

export default Presenter;

const Completedloans = (props) => {
  const { children, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Reviews"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Content</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {children.map((list) => (
                  <TableRow
                    hover
                    key={
                      list.id
                    }
                  >
                    <TableCell>{list.content}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

Completedloans.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  reviewList: PropTypes.node,
};

Completedloans.defaultProps = {
  className: null,
  children: null,
  reviewList: null,
};

Presenter.propTypes = {
  reviewList: PropTypes.node,
};

Presenter.defaultProps = {
  reviewList: null,
};
