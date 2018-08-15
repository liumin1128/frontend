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
    label: 'fistname',
  },
  {
    key: 'lastName',
    label: 'lastname',
  },
  {
    key: 'studentId',
    label: 'student number',
  },
  {
    key: 'email',
    label: 'Email address for notification',
  },
  {
    key: 'description',
    label: 'remark：（what does the meeting concern?   in what capacity do you wish to see me?  ）',
    props: {
      multiline: true,
      rows: 4,
    },
  },
];

const initialValue = {};

@connect(({ book }) => ({ book }))
@withRouter
@withStyles(styles)
@nossr
export default class CreateArticle extends PureComponent {
  editor = createRef()


  onSubmit = (values) => {
    // console.log(values);
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(values);
    }
  }

  validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = '姓不可以不填哦';
    }

    if (!values.lastName) {
      errors.lastName = '姓不可以不填哦';
    }

    if (!values.studentId) {
      errors.studentId = '学号不可以不填哦';
    }
    if (!values.description) {
      errors.description = '描述不可以不填哦';
    }
    if (!values.email) {
      errors.email = '邮箱不可以不填哦';
    }


    return errors;
  }

  render() {
    // const user = getStorage(STORE_USER_KEY);
    // if (!user || !user.token) {
    //   return '尚未登录';
    // }

    // console.log('this.props');
    // console.log(this.props);


    const { classes, book = {}, router, buttonDisabled } = this.props;
    const _id = router.query._id;

    const formData = book.setting ? {
      ...book.setting,
    } : initialValue;

    return (
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
              disabled={buttonDisabled}
            >
                立即预订
            </Button>

          </form>
        )}
      />

    );
  }
}
