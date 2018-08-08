import React, { PureComponent, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
  root: {
    maxWidth: 700,
    margin: '92px auto 32px',
  },

  submitButton: {
    marginTop: 16,
    margin: '0 auto',
    display: 'block',
    // padding: '16px 32px',
  },
});


@connect(({ user }) => ({ user }))
@withStyles(styles)
export default class Index extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>

        <div className={classes.root}>
          888
        </div>

      </Fragment>
    );
  }
}
