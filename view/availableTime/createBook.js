import React, { PureComponent, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@/components/form/textField';
import nossr from '@/hoc/nossr';

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
      errors.firstName = 'please fill the first name';
    }

    if (!values.lastName) {
      errors.lastName = 'please fill the lastname';
    }

    if (!values.studentId) {
      errors.studentId = 'please fill the studentID';
    }
    if (!values.description) {
      errors.description = 'please fill the remark';
    }
    if (!values.email) {
      errors.email = 'please fill the eamil address';
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
                book meeting
            </Button>

          </form>
        )}
      />

    );
  }
}
