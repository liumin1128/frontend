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

@withStyles(styles)
@nossr
export default class CreateArticle extends PureComponent {
  editor = createRef()

  validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = '文章标题不能留空';
    }
    if (!values.tags) {
      errors.tags = '至少填写一个标签';
    }
    return errors;
  }

  render() {
    const user = getStorage(STORE_USER_KEY);
    // if (!user || !user.token) {
    //   return '尚未登录';
    // }

    const { classes } = this.props;

    return (
      <Mutation mutation={CREATE_AVAILABLETIME}>
        {(createArticle, { loading, error, data = {} }) => {
          // if (loading) return 'Loading...';
          // if (error) return `Error! ${error.message}`;
          const onSubmit = async ({ title, tags }) => {
            const html = this.editor.getHtml();
            const json = this.editor.getJson();
            const input = {
              content: html,
              rawData: JSON.stringify(json),
              rawDataType: 'draft',
              tags: tags.split(' '),
              title,
            };
            try {
              const result = await createArticle({
                variables: { input },
                refetchQueries: ['ArticleList'],
              });
              console.log('result');
              console.log(result);
              Snackbar.success('发布成功！');
              Router.push('/article');
            } catch (err) {
              console.log('err');
              console.log(err);
              // Snackbar.error('文章发布失败');
            }
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
                        <Field
                          name="days"
                          label="公开最近几天的空余时间"
                          type="text"
                          component={TextField}
                          margin="normal"
                          fullWidth
                        />

                        <Field
                          name="startOfDay"
                          label="每日最早几点"
                          type="text"
                          component={TextField}
                          margin="normal"
                          fullWidth
                        />

                        <Field
                          name="endOfDay"
                          label="每日最晚几点"
                          type="text"
                          component={TextField}
                          margin="normal"
                          fullWidth
                        />

                        <Field
                          name="minute"
                          label="时间片段精确到多少分钟"
                          type="text"
                          component={TextField}
                          margin="normal"
                          fullWidth
                        />

                        <Field
                          name="minute"
                          label="允许多名访客同时会面吗"
                          type="text"
                          component={TextField}
                          margin="normal"
                          fullWidth
                        />

                        <Field
                          name="message"
                          label="给访客的留言"
                          type="text"
                          multiline
                          rows="4"
                          component={TextField}
                          margin="normal"
                          fullWidth
                        />


                        <Button className={classes.submitButton} variant="contained" color="primary">
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
