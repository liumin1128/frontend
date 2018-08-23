import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TimetableDetail from '@/view/timetable/detail';
import Layout from '@/components/layout';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1110,
    margin: 'auto',
    padding: 0,
  },
  body: {
    maxWidth: 760,
    width: '100%',
    margin: '0 auto',
  },
  container: {
    boxSizing: 'border-box',
    margin: 0,
    // border: '1px red solid',
    width: '100%',
    '@media (max-width: 960px)': {
      margin: 0,
    },
  },
});

@withStyles(styles)
export default class News extends PureComponent {
  static async getInitialProps({ query }) {
    return { query };
  }

  render() {
    const { classes, query } = this.props;

    // console.log('query');
    // console.log(query);
    return (
      <Layout>
        <div className={classes.root}>
          <div className={classes.root}>

            <div className={classes.body}>
              <TimetableDetail query={query} />
            </div>

          </div>
        </div>
      </Layout>
    );
  }
}
