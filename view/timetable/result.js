import React, { PureComponent, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@/components/snackbar';

const styles = theme => ({
});

@withStyles(styles)
export default class Index extends PureComponent {
  render() {
    const { classes, timetable } = this.props;

    const url = `http://localhost:8000/timetable/detail?_id=${timetable._id}`;


    return (

      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            发布成功！
          </Typography>
          <Typography component="p">
            您的日程安排【
            {timetable.title}
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

    );
  }
}
