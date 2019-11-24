import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
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

const LatestOrders = (props) => {
  const { className, TxList, onClickBtn, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Our Transactions"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lender</TableCell>
                  <TableCell>Borrower</TableCell>
                  <TableCell>Money</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Confirm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {TxList.map((tx) => (
                  <TableRow
                    hover
                    key={tx.id}
                  >
                    <TableCell>{tx.lender}</TableCell>
                    <TableCell>{tx.borrower}</TableCell>
                    <TableCell>{tx.money}</TableCell>
                    <TableCell>
                      {
                      tx.completed === false ? (<div>PayMeBack!</div>) : (<div>Done</div>)
                      }
                    </TableCell>
                    <TableCell>
                      <button onClick={() => onClickBtn(tx.id)}>OK</button>
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

LatestOrders.propTypes = {
  className: PropTypes.string,
  TxList: PropTypes.string,
};

LatestOrders.defaultProps = {
  className: null,
  TxList: null,
};

export default LatestOrders;
