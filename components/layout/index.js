import React, { PureComponent, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import UserInfo from '@/view/me/info';

const styles = theme => ({
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 700,
    margin: '50px auto',
    paddingBottom: 16,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  box: {
    position: 'relative',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    color: '#fff',
  },

  button: {
    background: 'rgba(22,200,200,0.05)',
  },
});

@withStyles(styles)
export default class Index extends PureComponent {
  render() {
    const { classes, children, noAuth } = this.props;
    return (
      <Fragment>
        <Card className={classes.card}>
          <div className={classes.box}>
            <CardMedia
              className={classes.media}
              image="/static/images/1.jpg"
              title="Contemplative Reptile"
            />
            {!noAuth && (
              <div className={classes.info}>
                <UserInfo />
              </div>
            )}
          </div>
          {children}
        </Card>
      </Fragment>

    );
  }
}
