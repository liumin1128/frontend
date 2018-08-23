import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { USERINFO } from '@/graphql/user';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    padding: 16,
    color: '#fff',
    display: 'flex',
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 16,
    border: '2px #fff solid',
  },
  p: {
    color: '#fff',
    margin: 0,
  },
  logout: {
    fontSize: 12,
    color: '#fff',
    border: '1px rgba(255,255,255,0.5) solid',
    // padding: 2,
    lineHeight: '14px',
    marginLeft: 16,
  },
});

@connect(({ book }) => ({ book }))
@withStyles(styles)
export default class ArticleDetail extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Query query={USERINFO}>
        {({ loading, error, data = {} }) => {
          const { user = {} } = data;
          console.log('user');
          console.log(user);
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <Fragment>
              <div className={classes.root}>
                <Avatar className={classes.avatar} src="/static/images/avatar.jpeg" />
                <div>
                  <Typography className={classes.p} variant="title" gutterBottom>
                    {user.nickname}
                    <Button className={classes.logout} variant="outlined" component="span">
                      logout
                    </Button>
                  </Typography>
                  <Typography className={classes.p} variant="Subheading" gutterBottom>
                    {user.username}
                  </Typography>
                </div>
              </div>
            </Fragment>

          );
        }}
      </Query>
    );
  }
}
