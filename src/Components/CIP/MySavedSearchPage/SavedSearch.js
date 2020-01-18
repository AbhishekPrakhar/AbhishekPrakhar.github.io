import React, { Component } from 'react';
import './SavedSearch.css';
import Typography from '@material-ui/core/Typography';
import Bar from '../GenericComponents/ProgressBar/Progress';
import Search from './DataToTableMapper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import BreadCrumbs from '../GenericComponents/BreadCrumbs/breadCrumbs';

class SavedSearches extends Component {

  render() {
    const savedSearchData = [
      { id: 1, title: " HarvardUni, last one year", day: "1", privatePublicField: "public" },
      { id: 2, title: "PharmaNews", day: "2", privatePublicField: "private" },
      { id: 3, title: "Phase 2-3 BASF pharma", day: "12", privatePublicField: "private" },
      { id: 4, title: "FDA citations PSK9,all competitors", day: "15", privatePublicField: "public" },
      { id: 5, title: "Contraception patents for Pfizer", day: "20", privatePublicField: "private" },
      { id: 6, title: "anticoagulants", day: "25", privatePublicField: "public" },
      { id: 7, title: "FDA citations PSK9,all competitors", day: "18", privatePublicField: "public" },
    ];
    const Maxlength = 20;
    const size = savedSearchData.length;
    let searches = (
      <div>
        <Search savedSearchData={savedSearchData} />
      </div>
    );

    const h4 = {
      fontWeight: 'bold'
    };

    return (
      <div >
        <BreadCrumbs TabName='Home' TabValue = '0' PageName = 'My Saved Searches'/>
        <div className="savedsearchwrapper">
          <Typography className="title" gutterBottom >
            My Saved Searches
         </Typography>
          <div className="ProgressBarWrapper">
            <Typography className="pages" variant="subtitle"  >
              {size} of {Maxlength} pages saved
            </Typography>
            <div className="barstyle">
              <Bar length={size} Maxlength={Maxlength} />
            </div>
          </div>
        </div>
        <Paper style={{ marginLeft: 20, marginRight: 20, borderRadius: 0, color: '#fff' }}>
          {searches}
        </Paper>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    selectedEvent: state.selectedEvent,
    classes: PropTypes.object.isRequired
  }
}

export default connect(mapStateToProps)(SavedSearches);

