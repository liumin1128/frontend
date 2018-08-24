import React, { PureComponent, Fragment, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import Layout from '@/components/layout';

const styles = theme => ({
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 500,
    margin: '50px auto',
    paddingBottom: 16,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    // fontSize: 20,
    // marginBottom: 16,
    background: 'rgba(22,200,200,0.05)',
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

@withStyles(styles)
export default class Index extends PureComponent {
  input = createRef()

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Fragment>
          <CardContent>
            <TextField
              // defaultValue=""
              label="Please enter the invitation code"
              id="bootstrap-input"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput,
                },
                inputRef: (c) => { this.input = c; },
              }}
              InputLabelProps={{
                shrink: true,
                className: classes.bootstrapFormLabel,
              }}
              style={{ width: '100%' }}
            />

          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                console.log(this.input.value);
                Router.push(`http://localhost:8000/timetable/detail?_id=${this.input.value}`);
              }}
              raised
              className={classes.button}
              size="large"
              color="primary"
            >
              book meeting
            </Button>
          </CardActions>
        </Fragment>
      </Layout>
    );
  }
}
