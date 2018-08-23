import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Layout from '@/components/layout';

const styles = theme => ({
  button: {
    // fontSize: 20,
    // marginBottom: 16,
    background: 'rgba(22,200,200,0.05)',
  },
});

@withStyles(styles)
export default class Index extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Fragment>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Welcome!
            </Typography>
            <Typography color="textSecondary">
               welcome to smart meeting scheduler
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={'/timetable/create'}>
              <Button raised className={classes.button} size="large" color="primary">
                create meeting sheculer
              </Button>
            </Link>

            <Link href={'/timetable'}>
              <Button size="large" color="primary">
                book a meeting
              </Button>
            </Link>

            <Link href={'/me'}>
              <Button size="large" color="primary">
              personal center
              </Button>
            </Link>
          </CardActions>
        </Fragment>
      </Layout>
    );
  }
}
