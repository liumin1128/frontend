import React, { PureComponent, Fragment } from 'react';
import { CREATE_TIMETABLE } from '@/graphql/timetable';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@/components/snackbar';
import Book from '@/view/book';
import { modalConsumer } from '@/hoc/widthModal';

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
@modalConsumer
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
    const { dispatch } = this.props;
    dispatch({
      type: 'book/save',
      payload: {
        times: values,
      },
    });
  }


  render() {
    const { classes } = this.props;

    return (
      <Mutation mutation={CREATE_TIMETABLE}>
        {(createTimetable, { loading, error, data = {} }) => {
          const onSubmit = async () => {
            const { times, setting } = this.state;

            const input = {
              ...setting,
              times: JSON.stringify(times),
            };

            try {
              const { data } = await createTimetable({
                variables: { input },
                refetchQueries: ['TimetableList'],
              });

              const { modal } = this.props;
              const url = `http://localhost:8000/timetable/detail?_id=${data.item._id}`;


              modal(() => (
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      发布成功！
                    </Typography>
                    <Typography component="p">
                      您的日程安排【
                      {input.title}
                      】已创建成功！请将以下地址分享给您的朋友：
                    </Typography>
                    <Typography component="p">
                      <pre style={{ padding: 16, background: 'rgba(0,0,0,0.05)' }} href="http://localhost:8000">
                        {url}
                      </pre>
                    </Typography>
                    <p />
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      关闭
                    </Button>

                    <CopyToClipboard
                      text={url}
                      onCopy={() => {
                        Snackbar.success('已复制到剪帖板！');
                      }}
                    >
                      <Button
                        size="small"
                        color="primary"
                      >
                        复制到剪切板
                      </Button>
                    </CopyToClipboard>

                    <Button size="small" color="primary">
                      前往查看
                    </Button>
                  </CardActions>
                </Card>
              ));


              // console.log('result');
              // console.log(result);
              // Router.push('/article');
            } catch (err) {
              console.log('err');
              console.log(err);
              // Snackbar.error('文章发布失败');
            }
          };

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
                      onClick={onSubmit}
                    >
                      我选好了，迫不及待想要发布呢
                    </Button>
                  </CardContent>
                </Card>
              </div>

            </Fragment>
          );
        }}
      </Mutation>
    );
  }
}
