import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Icon from '@material-ui/core/Icon';
import messages from 'enl-api/ui/menuMessages';
import styles from './sidebar-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

class MainMenu extends React.Component { // eslint-disable-line
  handleClick(id) {
    
    const { toggleDrawerOpen, loadTransition } = this.props;
    toggleDrawerOpen();
    loadTransition(false);
  }

  render() {
    const {
      classes,
      openSubMenu,
      open,
      dataMenu,
      intl,
      menuName,
      menuKey,
      menuIcon
    } = this.props;
    const getMenus = menuArray => menuArray.map((item, index) => {
  
      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={classes.nested}
          activeClassName={classes.active}
          component={LinkBtn}
          to={'/app/publisher/'+item.id}
          onClick={() => this.handleClick(item.id)}
        >
          <ListItemText
            classes={{ primary: classes.primary }}
            variant="inset"
            primary={
              messages[menuKey] !== undefined
                ? intl.formatMessage(messages[menuKey])
                : item.name
            }
          />
      
        </ListItem>
      );
    });
    return (
      <div>
         <div key={menuKey}>
            <ListItem
              button              
              onClick={() => openSubMenu(menuKey, menuKey+'Parent')}
            >
              {menuIcon && (
                <ListItemIcon className={classes.icon}>
                  <Icon>assessment</Icon>
                </ListItemIcon>
              )}
              <ListItemText
                classes={{ primary: classes.primary }}
                variant="inset"
                primary={menuName}
              />
              { open.indexOf(menuKey) > -1 ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse
              component="div"             
              in={open.indexOf(menuKey) > -1}
              timeout="auto"
              unmountOnExit
            >
              <List className={classes.dense} component="nav" dense>
                { getMenus(dataMenu, 'key') }
              </List>
            </Collapse>
          </div>
      </div>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  dataMenu: PropTypes.array.isRequired,
  intl: intlShape.isRequired
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });
const reducer = 'ui';

const mapStateToProps = state => ({
  force: state, // force active class for sidebar menu
  open: state.getIn([reducer, 'subMenuOpen'])
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch),
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default withTheme((withStyles(styles)(injectIntl(MainMenuMapped))));
