import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';

import MobileDrawer from '../components/MobileDrawer';
import Navbar from '../components/Navbar';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: '#000',
    width: '100%',
    height: 'calc(100% - 56px)',
    marginTop: 56,
    marginLeft: 120,
    marginRight: 120,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

const layout = (BaseComponent) => {
  class ComposedComponent extends PureComponent {
    render() {
      const { classes } = this.props;
      // console.log($path);
      return (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <MobileDrawer currentPath={'/yahoo'} />
            <Navbar currentPath={'/yahoo'} />
            <main className={classes.content}>
              <BaseComponent {...this.props} />
            </main>
          </div>
        </div>
      );
    }
  }
  return withStyles(styles, { withTheme: true })(ComposedComponent);
};

export default layout;
