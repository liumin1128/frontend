import React, { PureComponent, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

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
  button: {
    background: 'rgba(22,200,200,0.05)',
  },
});

@withStyles(styles)
export default class Index extends PureComponent {
  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/images/1.jpg"
            title="Contemplative Reptile"
          />
          {children}
        </Card>
      </Fragment>

    );
  }
}
