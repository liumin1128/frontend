import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Book from '@/view/book';

const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: '92px auto 32px',
  },
  appbar: {
    // borderRadius: 5,
  },
  submitButton: {
    marginTop: 16,
    margin: '0 auto',
    display: 'block',
    // padding: '16px 32px',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tip: {
    fontSize: 10,
    color: '#999',
    marginBottom: 8,
  },
});

@connect(({ book }) => ({ ...book }))
@withStyles(styles)
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      times: this.props.times,
      setting: this.props.setting,
    };
  }

  onChange = (values) => {
    console.log('values');
    console.log(values);
    this.setState({ times: values });
  }

  onSubmit =() => {
    const { times, setting } = this.state;

    console.log(times);
    console.log(setting);
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>

        <AppBar position="fixed" className={classes.appbar}>

          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => {
                Router.push('/book/setting');
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              选择可用时间
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.root}>
          <div className={classes.tip}>
            点击选择可用时间段，可以按住拖动来一次选择多个哦~
          </div>
          <Card>
            <CardContent>
              <Book onChange={this.onChange} />
              <Button
                variant="contained"
                color="primary"
                className={classes.submitButton}
                onClick={this.onSubmit}
              >
                我选好了，迫不及待想要发布呢
              </Button>
            </CardContent>
          </Card>
        </div>

      </Fragment>
    );
  }
}
