import React, { PureComponent, Fragment, createRef } from 'react';
// import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import Head from 'next/head';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { Form, Field } from 'react-final-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
    margin: '0px auto 16px',
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
    key: 'title',
    label: 'Booking page title ',
  },
  // {
  //   key: 'days',
  //   label: '最近几天的空余时间',
  //   props: {
  //     select: true,
  //     type: 'number',
  //     SelectProps: {
  //       native: true,
  //     },
  //     children: new Array(15)
  //       .fill('x')
  //       .map((i, index) => index)
  //       .map(i => (
  //         <option key={i} value={i}>
  //           {i}
  //         </option>
  //       )),
  //   },
  // },
  {
    key: 'startOfDay',
    label: 'Start date from :  ',
    props: {
      type: 'date',
    },
  },
  {
    key: 'endOfDay',
    label: 'The end date :',
    props: {
      type: 'date',
    },
  },
  {
    key: 'startOfHour',
    label: 'When is the start time?',
    props: {
      select: true,
      SelectProps: {
        native: true,
      },
      children: new Array(24)
        .fill('x')
        .map((i, index) => index)
        .map(i => (
          <option key={i} value={i}>
            {i}
          </option>
        )),
    },
  },
  {
    key: 'endOfHour',
    label: 'When is the end time? ',
    props: {
      select: true,
      SelectProps: {
        native: true,
      },
      children: new Array(24)
        .fill('x')
        .map((i, index) => index)
        .map(i => (
          <option key={i} value={i}>
            {i}
          </option>
        )),
    },
  },
  {
    key: 'timeRange',
    label: 'Duration',
    props: {
      select: true,
      SelectProps: {
        native: true,
      },
      children: [
        { value: 60, lable: '1 hour' },
        { value: 30, lable: '30 min' },
        { value: 15, lable: '15 min' },
        { value: 5, lable: '5 min' },
      ].map((i) => {
        return (
          <option key={i.value} value={i.value}>
            {i.lable}
          </option>
        );
      }),
    },
  },
  {
    key: 'multi',
    label: 'Can multiple visitors meet at the same time？',
    props: {
      select: true,
      SelectProps: {
        native: true,
      },
      children: [
        { value: true, lable: 'Yes' },
        { value: false, lable: 'No' },
      ].map((i) => {
        return (
          <option key={i.value} value={i.value}>
            {i.lable}
          </option>
        );
      }),
    },

  },
  {
    key: 'email',
    label: 'Email address for notification',
  },
  {
    key: 'description',
    label: 'Remark ：',
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
@nossr
export default class CreateArticle extends PureComponent {
  editor = createRef()


  onSubmit = (values) => {
    const params = values;

    // 将部分参数转为整形
    ['days', 'startOfHour', 'endOfHour', 'timeRange'].map((i) => {
      if (params[i]) {
        params[i] = parseInt(params[i], 0);
      }
    });

    // 将参数存进redux
    const { dispatch } = this.props;
    dispatch({ type: 'book/save', payload: { setting: params } });

    Router.push('/book/booking');
  }

  validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'please fill the booking page title ';
    }

    if (!values.email) {
      errors.email = 'please fill the email address title';
    }

    if (!values.description) {
      errors.description = 'Please leave some information that you want your students to notice or comment on';
    }

    return errors;
  }

  render() {
    // const user = getStorage(STORE_USER_KEY);
    // if (!user || !user.token) {
    //   return '尚未登录';
    // }

    const { classes, book = {} } = this.props;

    const formData = book.setting ? {
      ...book.setting,
    } : initialValue;

    return (
      <Fragment>

        <Head>
          <link href="/static/draft-editor.css" rel="stylesheet" />
        </Head>

        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
                  Setup your avaliable time
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.root}>


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
                  I've filled it. Let's pick the time period!
                  </Button>

                </form>
              )}
            />
          </CardContent>
        </div>
      </Fragment>
    );
  }
}
