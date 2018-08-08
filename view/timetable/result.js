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
           Successful realease!
          </Typography>
          <Typography component="p">
           Your schedule[
            {timetable.title}
            】 has been created successfully! Please share the following address with your friends:
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
            Close
          </Button>

          <CopyToClipboard
            text={url}
            onCopy={() => {
              Snackbar.success('Copied to clipboard   ！！');
            }}
          >
            <Button
              size="small"
              color="primary"
            >
                      Copy to clipboard
            </Button>
          </CopyToClipboard>

          <Button size="small" color="primary">
                      View the booking information
          </Button>
        </CardActions>
      </Card>

    );
  }
}
