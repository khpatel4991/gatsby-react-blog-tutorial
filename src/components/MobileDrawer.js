import React, { PureComponent } from 'react';
import Hidden from 'material-ui/Hidden';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MdMenu from 'react-icons/lib/md/menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import { navigateTo } from "gatsby-link"

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  drawerPaper: {
    width: 250,
    background: 'black',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    background: 'black',
  },
});

const navList = [
  { index: 0, name: 'Home', path: 'https://khpatel4991.com' },
  { index: 1, name: 'Blog', path: '/' },
  { index: 2, name: 'About Me', path: 'https://khpatel4991.com/aboutme' },
];

class MobileDrawer extends PureComponent {
  static route(pathname) {
    //Router.push(pathname);
    console.log(pathname);
    navigateTo(pathname);
  }

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState(prev => ({
      mobileOpen: !prev.mobileOpen,
    }));
  };

  render() {
    // eslint-disable-next-line
    const { classes, theme, currentPath } = this.props;
    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <List>
          {navList.map((item) => {
            const listItemClasses = (item.path === currentPath) ?
              classes.currentListItemText :
              classes.listItemText;
            return (
              <ListItem
                key={item.index}
                button
                className={listItemClasses}
              >
                <ListItemText
                  primary={item.name}
                  onClick={() => MobileDrawer.route(item.path)}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
    return (
      <Hidden mdUp>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MdMenu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          type="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={this.state.mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onRequestClose={this.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MobileDrawer);
