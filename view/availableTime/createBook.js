import React, { PureComponent, Fragment, createRef } from 'react';
// import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import Head from 'next/head';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router';

import { Form, Field } from 'react-final-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Snackbar from '@/components/snackbar';
import TextField from '@/components/form/textField';
// import { CREATE_AVAILABLETIME } from '@/graphql/book';
import nossr from '@/hoc/nossr';
// import { getStorage } from '@/utils/store';
// import { isServerSide } from '@/utils/common';
// import { STORE_USER_KEY } from '@/constants/base';

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
    padding: '16px 32px',
  },
});

const formKeys = [
  {
    key: 'firstName',
    label: '名',
  },
  {
    key: 'lastName',
    label: '姓',
  },
  {
    key: 'studentId',
    label: '学号',
  },

  {
    key: 'description',
    label: '备注',
    props: {
      multiline: true,
      rows: 4,
    },
  },
];

const initialValue = {
  startOfDay: moment().format('YYYY-MM-DD'),
  endOfDay: moment().add(7, 'days').format('YYYY-MM-DD'),
  startOfHour: 8,
  endOfHour: 17,
  timeRange: 60,
  multi: true,
};

@connect(({ book }) => ({ book }))
@withStyles(styles)
@withRouter
@nossr
export default class CreateArticle extends PureComponent {
  editor = createRef()


  onSubmit = (values) => {
    console.log(values);
  }

  validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = '标题不可以不填哦';
    }

    return errors;
  }

  render() {
    // const user = getStorage(STORE_USER_KEY);
    // if (!user || !user.token) {
    //   return '尚未登录';
    // }

    console.log('this.props');
    console.log(this.props);


    const { classes, book = {}, router } = this.props;
    const _id = router.query._id;

    const formData = book.setting ? {
      ...book.setting,
    } : initialValue;

    return (
      <Fragment>

        <Head>
          <link href="/static/draft-editor.css" rel="stylesheet" />
        </Head>

        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => {
                Router.push(`/timetable/detail?_id=${_id}`);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              填写信息
            </Typography>
          </Toolbar>
        </AppBar>

        <Card className={classes.root}>


          <CardContent>

            <Form
              onSubmit={this.onSubmit}
              initialValues={formData}
              // values={formData}
              validate={this.validate}
              render={({ handleSubmit, reset, submitting, pristine, change, values }) => (
                <form id="createArticleForm" onSubmit={handleSubmit}>

                  {
                    formKeys.map(i => (
                      <Field
                        key={i.key}
                        name={i.key}
                        label={i.label}
                        component={TextField}
                        type="text"
                        margin="normal"
                        fullWidth
                        value={formData[i.key]}
                        {...i.props}
                      />
                    ))
                  }

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                  >
                    立即预订
                  </Button>

                </form>
              )}
            />
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}
