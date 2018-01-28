import React, { PureComponent } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Link, { navigateTo } from 'gatsby-link';

const styles = {
  fullAppBar: {
    position: 'absolute',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

const navList = [
  { index: 0, name: 'Home', path: 'https://khpatel4991.com' },
  { index: 1, name: 'Blog', path: '/' },
  { index: 2, name: 'About Me', path: 'https://khpatel4991.com/aboutme' },
];

class Navbar extends PureComponent {
  static route(pathname) {
    navigateTo(pathname);
  }
  render() {
    // eslint-disable-next-line
    const { classes } = this.props;
    return (
      <Hidden mdDown implementation="css">
        <AppBar className={classes.fullAppBar}>
          <Toolbar>
          <Typography className={classes.flex}>
            {''}
          </Typography>
            {navList.map(item => (
              <Button
                key={item.index}
                color="contrast"
                href={item.path}
              >
                {item.name}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      </Hidden>
    );
  }
}

export default withStyles(styles)(Navbar);
