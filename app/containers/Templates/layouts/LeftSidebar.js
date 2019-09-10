import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  Header,
  Sidebar,
  BreadCrumb,
} from 'enl-components';
import { Link, withRouter } from 'react-router-dom';

import dataMenu from 'enl-api/ui/menu';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from 'enl-api/ui/menuMessages';
import styles from '../appStyles-jss';


  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.token;  


class LeftSidebarLayout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       //states
    };
  }

  componentDidMount(){
      this.setState({
        userName : userData.name
      })
  };

  componentWillUnmount() {
      this.unlisten();
  }


  componentWillMount(){
    let num = true;
    if(num == true){
      this.unlisten = this.props.history.listen(() => {

        let parts = location.pathname.split('/');
        const place = parts[parts.length - 1];
        parts = parts.slice(1, parts.length - 1);
        parts = parts[parts.length - 1];

        console.log('New URL', this.props.history.location.pathname);
        if(parts == 'publisher'){
          this.props.getPublisher(place, token);
          this.props.getPublisherAnalytics(place, token);
          this.props.getPublisherEmbeds(place, token);  
        }
        
      });
      num = false
    }
  };



  render() {
    const {
      classes,
      children,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
      getPublisher,
      getPublisherAnalytics,
      getPublisherEmbeds,
      pageLoaded,
      mode,
      history,
      changeMode,
      place,
      titleException,
      handleOpenGuide,
      signOut,
      userAttr,
      isLogin,
      publisher, 
      publisherAnalytics, 
      publisherEmbeds
    } = this.props;
    return (
      <Fragment>
        <Header
          toggleDrawerOpen={toggleDrawer}
          margin={sidebarOpen}
          changeMode={changeMode}
          mode={mode}
          title={publisher.name}
          userName={this.state.userName}
          history={history}
          openGuide={handleOpenGuide}
          signOut={signOut}
          isLogin={isLogin}
        />
        <Sidebar
          open={sidebarOpen}
          toggleDrawerOpen={toggleDrawer}
          loadTransition={loadTransition}
          dataMenu={dataMenu}
          userAttr={userAttr}
          leftSidebar
        />
        <main className={classNames(classes.content, !sidebarOpen ? classes.contentPaddingLeft : '')} id="mainContent">
          <section className={classNames(classes.mainWrap, classes.sidebarLayout)}>
            {titleException.indexOf(publisher.name) < 0 && (
              <div className={classes.pageTitle}>
                <Typography component="h4" variant="h4">                  
                  {messages[publisher.name] !== undefined ? <FormattedMessage {...messages[publisher.name]} /> : publisher.name}
                </Typography>
                <BreadCrumb publisherData={publisher} separator=" / " theme="light" location={history.location} />
              </div>
            )}
            { !pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />) }
            <Fade
              in={pageLoaded}
              mountOnEnter
              unmountOnExit
              {...(pageLoaded ? { timeout: 700 } : {})}
            >
              <div className={!pageLoaded ? classes.hideApp : ''}>
                {/* Application content will load here */}
                { children }
              </div>
            </Fade>
          </section>
        </main>
      </Fragment>
    );
  }
}



LeftSidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  getPublisher: PropTypes.func.isRequired,
  getPublisherAnalytics: PropTypes.func.isRequired,
  getPublisherEmbeds: PropTypes.func.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
  userAttr: PropTypes.object.isRequired,
};

LeftSidebarLayout.defaultProps = {
  isLogin: false
};

const reducer = 'ui';
const viewPub = (id, token) => ({ type: 'VIEW_PUB', id, token });
const viewPubAnalytics = (id, token) => ({ type: 'VIEW_PUB_ANALYTICS', id, token });
const viewPubEmbeds = (id, token) => ({ type: 'VIEW_PUB_EMBEDS', id, token });



const mapStateToProps = state => ({
  publisher: state.getIn([reducer, 'publisher']),
  publisherAnalytics: state.getIn([reducer, 'publisherAnalytics']),
  publisherEmbeds: state.getIn([reducer, 'publisherEmbeds'])
});


const mapDispatchToProps = dispatch => ({
  getPublisher: bindActionCreators(viewPub, dispatch),
  getPublisherAnalytics: bindActionCreators(viewPubAnalytics, dispatch),
  getPublisherEmbeds: bindActionCreators(viewPubEmbeds, dispatch)
});


const LeftSidebarLayoutMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSidebarLayout)

export default (withStyles(styles)(injectIntl(LeftSidebarLayoutMapped)));
