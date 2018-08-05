import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Book from '@/view/book';

const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: '0 auto',
  },
  appbar: {
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 16,
    margin: '0 auto',
    display: 'block',
    padding: '16px 32px',
  },
});

@withStyles(styles)
export default class Index extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Card className={classes.root}>


          <CardContent>

            <AppBar position="static" className={classes.appbar}>
              <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  选择可用时间
                </Typography>
              </Toolbar>
            </AppBar>
            <br />
            <Book />
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}
