import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  Grid,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
    loanlist,
  } = props;
  return (
    <Grid
      item
      lg={10}
      sm={10}
      xl={10}
      xs={12}
      justify="center"
      alignItems="center"
    >
      <Completedloans>
        {loanlist}
      </Completedloans>
    </Grid>
  );
};

Presenter.propTypes = {
  loanlist: PropTypes.string.isRequired,
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
        title="Completed Loans"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Total Members</TableCell>
                  <TableCell>Total Money</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Deadline
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {children.map((list, idx) => (
                  <TableRow
                    hover
                    key={
                      list.id
                    }
                  >
                    <TableCell>{list.num_members}</TableCell>
                    <TableCell>{list.total_money}</TableCell>
                    <TableCell>
                      {moment(list.deadline).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        {moment(list.completed_date).format('DD/MM/YYYY')}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all
          <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

Completedloans.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Completedloans.defaultProps = {
  className: null,
  children: null,
};
