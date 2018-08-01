import React, { PureComponent, Fragment, createRef } from 'react';
import { Mutation } from 'react-apollo';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { Form, Field } from 'react-final-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Snackbar from '@/components/snackbar';
import TextField from '@/components/form/textField';
import Select from '@/components/form/select';
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
  submitButton: {
    marginTop: 16,
    margin: '0 auto',
    display: 'block',
  },
});

const formKeys = [
  {
    key: 'title',
    label: '一个醒目的标题',
    component: TextField,
  },
  {
    key: 'days',
    label: '最近几天的空余时间',
    component: TextField,
  },
  {
    key: 'startOfDay',
    label: '每日最早几点',
    component: TextField,
  },
  {
    key: 'endOfDay',
    label: '每日最晚几点',
    component: TextField,
  },
  {
    key: 'multi',
    label: '允许多名访客同时会面吗',
    component: TextField,
  },
  {
    key: 'message',
    label: '给访客的留言',
    component: TextField,
    props: {
      multiline: true,
      rows: 4,
    },
  },
];

@withStyles(styles)
@nossr
export default class CreateArticle extends PureComponent {
  editor = createRef()

  validate = (values) => {
    console.log('values');
    console.log(values);

    const errors = {};
    if (!values.title) {
      errors.title = '标题不可以不填哦';
    }
    // Object.keys(values).map((i) => {
    //   console.log(i);
    //   if (!values[i]) {
    //     errors[i] = '不可以不填哦';
    //   }
    // });
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
                  <Form
                    onSubmit={onSubmit}
                      // initialValues={initialValue}
                    validate={this.validate}
                    render={({ handleSubmit, reset, submitting, pristine, change, values }) => (
                      <form id="createArticleForm" onSubmit={handleSubmit}>

                        {
                          formKeys.map(i => (
                            <Field
                              key={i.key}
                              name={i.key}
                              label={i.label}
                              component={i.component}
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
