import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 500,
    margin: '50px auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    // fontSize: 20,
    marginBottom: 16,
  },
});

@withStyles(styles)
export default class Index extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/images/1.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Welcome!
            </Typography>
            <Typography component="p">
              欢迎使用智能预约系统
            </Typography>
          </CardContent>
          <CardActions>
            <Button className={classes.button} size="large" color="primary">
            创建活动
            </Button>
            <Button className={classes.button} size="large" color="primary">
            加入活动
            </Button>
          </CardActions>
        </Card>
      </Fragment>

    );
  }
}
