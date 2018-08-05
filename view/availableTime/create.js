import React, { PureComponent, Fragment, createRef } from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
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
import Snackbar from '@/components/snackbar';
import TextField from '@/components/form/textField';
import { CREATE_AVAILABLETIME } from '@/graphql/book';
import nossr from '@/hoc/nossr';
import { getStorage } from '@/utils/store';
// import { isServerSide } from '@/utils/common';
import { STORE_USER_KEY } from '@/constants/base';

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

const formKeys = [
  {
    key: 'title',
    label: '一个醒目的标题',
  },
  {
    key: 'days',
    label: '最近几天的空余时间',
    props: {
      select: true,
      SelectProps: {
        native: true,
      },
      children: new Array(15)
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
    key: 'startOfDay',
    label: '每日最早几点',
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
    key: 'endOfDay',
    label: '每日最晚几点',
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
    label: '时间片段',
    props: {
      select: true,
      SelectProps: {
        native: true,
      },
      children: [
        { value: 60, lable: '一个小时' },
        { value: 30, lable: '30分钟' },
        { value: 15, lable: '15分钟' },
        { value: 5, lable: '5分钟' },
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
    label: '允许多名访客同时会面吗',
    props: {
      select: true,
      SelectProps: {
        native: true,
      },
      children: [
        { value: true, lable: '是' },
        { value: false, lable: '否' },
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
    key: 'message',
    label: '给访客的留言',
    props: {
      multiline: true,
      rows: 4,
    },
  },
];

const initialValue = {
  days: 7,
  startOfDay: 8,
  endOfDay: 17,
  timeRange: 30,
  multi: true,
};

@connect(({ book }) => ({ book }))
@withStyles(styles)
@nossr
export default class CreateArticle extends PureComponent {
  editor = createRef()

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

    const { classes } = this.props;

    return (
      <Mutation mutation={CREATE_AVAILABLETIME}>
        {(createArticle, { loading, error, data = {} }) => {
          // if (loading) return 'Loading...';
          // if (error) return `Error! ${error.message}`;
          const onSubmit = async (values) => {
            console.log(values);

            const { dispatch } = this.props;
            dispatch({ type: 'book/save', payload: { setting: values } });

            Router.push('/book/booking');

            // try {
            //   const result = await createArticle({
            //     variables: { input },
            //     refetchQueries: ['ArticleList'],
            //   });
            //   console.log('result');
            //   console.log(result);
            //   Snackbar.success('发布成功！');
            //   Router.push('/article');
            // } catch (err) {
            //   console.log('err');
            //   console.log(err);
            //   // Snackbar.error('文章发布失败');
            // }
          };
          return (
            <Fragment>
              <Head>
                <link href="/static/draft-editor.css" rel="stylesheet" />
              </Head>

              <Card className={classes.root}>


                <CardContent>

                  <AppBar position="static" className={classes.appbar}>
                    <Toolbar>
                      <Typography variant="title" color="inherit" className={classes.flex}>
                        设置
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <br />
                  <Form
                    onSubmit={onSubmit}
                    initialValues={initialValue}
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
                              {...i.props}
                            />
                          ))
                        }

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submitButton}
                          // onClick={() => {
                          // }}
                        >
                          我填好了，选择时间段吧
                        </Button>

                      </form>
                    )}
                  />
                </CardContent>
              </Card>
            </Fragment>
          );
        }}
      </Mutation>);
  }
}
