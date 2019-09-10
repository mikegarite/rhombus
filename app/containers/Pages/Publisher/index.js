import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComposedLineBarArea from './ComposedLineBarArea';

import messages from './messages';
import styles from '../../templates/appStyles-jss';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';


class Publisher extends React.Component {
  render() {
    const title = brand.name + ' - Publisher Page';
    const description = brand.desc;
    const { intl, publisher, publisherAnalytics, publisherEmbeds } = this.props;
    
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        
        <PapperBlock icon="library_books" url={publisher.url}>
        {publisherEmbeds.perc_page_views_w_embeds ? (
          <Grid container alignItems="center" xs={12}>
            <Grid container alignItems="center" style={{padding:20}} xs={6}>
              <div>
                <div>
                  <Grid container alignItems="flex-start" xs={12}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h4">
                        Next Payout 
                      </Typography>
                    </Grid>
                    {publisherAnalytics.next_payout &&
                    <Grid item>
                     <Tooltip title={publisherAnalytics.next_payout.days_left+ ' days left'} placement="top">
                      <Typography gutterBottom variant="h6">
                        ${publisherAnalytics.next_payout.payout}
                      </Typography>
                    </Tooltip>                      
                    </Grid>
                    }
                  </Grid>
                  
                </div>
                <div >
                   <Typography gutterBottom variant="body1">
                    Most common Hashtags
                  </Typography>
                  <div>
                    <div>
                     {publisherEmbeds.most_common_hashtag_counts.other && Object.keys(publisherEmbeds.most_common_hashtag_counts.other).map(function(char, idx) {
                        return <Chip color="primary" style={{margin:5}}  key={idx} label={char} />;
                    }.bind(this))}
                     </div>
                   
                  </div>
                </div>                
              </div>
            </Grid>
            <Grid container style={{padding:20}} xs={6}>
              <div>
                <div>
                  <Grid container alignItems="flex-start" xs={12}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h4">
                        Network Fee Percentage
                      </Typography>
                    </Grid>
                    <Grid item>
                    <Tooltip title={publisher.payment_rate} placement="top">
                      <Typography gutterBottom variant="h6">
                        {publisher.network_fee_percentage}
                      </Typography>
                    </Tooltip>                                            
                    </Grid>                   
                  </Grid>
                  
                </div>
                <div >
                  <Typography gutterBottom variant="body1">
                    Most Common User Names
                  </Typography>
                  <div>
                    {publisherEmbeds.most_common_usernames.other.map((item,i) => <Chip color="primary" style={{margin:5}}  key={i} label={item.username} />)}
                  </div>
                </div>                
              </div>
            </Grid>
          </Grid>
        ) : (
                  <LinearProgress />

        )}          

        </PapperBlock>

        <PapperBlock title='Analytics' icon="timeline">        
          {publisherAnalytics.geoCounts && publisherAnalytics.filledImpressions && publisherAnalytics.earnings ? (
            <div>
             <Typography gutterBottom variant="h6">
                    Most Common Geolocations
             </Typography>
            <ComposedLineBarArea data={publisherAnalytics.geoCounts.daily} />
             <Typography gutterBottom variant="h6">
                    Filled Impressions
             </Typography>
            <ComposedLineBarArea data={publisherAnalytics.filledImpressions.daily} />
             <Typography gutterBottom variant="h6">
                    Earnings
             </Typography>
            <ComposedLineBarArea data={publisherAnalytics.earnings.daily} />
            </div>
          ) : (
            <LinearProgress />
         )}        
        </PapperBlock>
      </div>
    );
  }
}

const reducer = 'ui';
const mapStateToProps = state => ({
  publisher: state.getIn([reducer, 'publisher']),
  publisherAnalytics: state.getIn([reducer, 'publisherAnalytics']),
  publisherEmbeds: state.getIn([reducer, 'publisherEmbeds'])
});

const mapDispatchToProps = dispatch => ({});

const PublisherMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Publisher);


export default (withStyles(styles)(injectIntl(PublisherMapped)));
