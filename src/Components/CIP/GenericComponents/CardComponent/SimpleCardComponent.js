import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import * as types from '../../../../Actions/ActionTypes';
import { setCurrentView } from '../../../../Actions/ActionSearchFunction';
import { store } from "../../../../Store/Store";
import NoRecordFoundMessage from '../NoRecordFoundMessage/NoRecordFoundMessage';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { faLockOpen, faLock, faUser, faTags, faTag, faBookmark, faUserTag, faShareAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';



const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function handleLinkClick(event, value) {
  if (value === types.LAUNCHESTIMATE) {
    store.dispatch(setCurrentView(types.LAUNCHESTIMATE));
    event.preventDefault();
  } else if (value === types.CONGRESSCALENDAR) {
    store.dispatch(setCurrentView(types.CONGRESSCALENDAR));
    event.preventDefault();
  }
}

function SimpleCardComponent(props) {
  const { classes } = props;

  console.log(props, "title check")

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className="contentList">
        {console.log("props.cardContent",props.cardContent)}
          {props.cardContent.length > 0 &&
            <div>
              {props.cardContent.map((value, index) => (
                <div className="cardContentContainer">
                  {/* {(value.title !== undefined && (props.panelHeading !== "What's On The Table" && props.panelHeading !== "Market Overview")) &&
                      <div><span title={value.title}>{value.title}</span><a title={value.title} target="_blank" href={value.link}>See more</a>
                        <Divider />
                      </div>
                    } */}
                  {(typeof (value) === "object" && (props.panelHeading !== "My Saved Searches" && props.panelHeading !== "Congress Planner" && props.panelHeading !== "Market Overview" && props.panelHeading !== "Journal Watch" && props.panelHeading !== "Patent Watch" && props.panelHeading !== "Regulatory Watch" && props.panelHeading !== "Press Release" && props.panelHeading !== "Person Watch" && props.panelHeading !== "Pipeline Watch" && props.panelHeading !== "Competitors News" && props.panelHeading !== "Industry News" && props.panelHeading !== "Product Information" && props.panelHeading !== "Licensing" && props.panelHeading !== "My Alerts")) &&
                    <div className="linkContainer"><a title={value.title} target="_blank" rel="noopener noreferrer" href={value.link}>{value.title}</a>
                      <Divider />
                    </div>
                  }
                  {/* {(value.title !== undefined && value.isLink && (props.panelHeading === "Congress Planner" || props.panelHeading === "Market Overview")) &&
                    <div>
                      <a target="_blank" rel="noopener noreferrer" title={value.title} href={value.link} onClick={(event) => handleLinkClick(event, value.key)}>
                        {value.title}
                      </a>
                      <Divider />
                    </div>
                  }
                  {(value.title !== undefined && !value.isLink && (props.panelHeading === "Congress Planner" || props.panelHeading === "Market Overview")) &&
                    <div>
                      <span>{value.title}</span>
                      < Divider />
                    </div>
                  } */}
                  {(typeof (value) === "object" && props.panelHeading === "My Saved Searches" && props.panelHeading !== "Journal Watch" && props.panelHeading !== "Patent Watch") &&
                    <div className="mySearchesWrapper" >
                      <div className="titleWrapper"  >
                        <a href="#"
                          onClick={(e) => props.HandleSavedSearch(e)}
                        >{value.title}</a>
                      </div>
                      <div className="daysWrapper">
                        <Badge badgeContent={value.days} color="secondary">
                        </Badge>
                        <span>days ago</span>
                      </div>
                      <Divider />
                    </div>
                  }

                  {(typeof (value) === "object" && props.panelHeading === "Journal Watch") &&
                    <div>
                      <a target="_blank" rel="noopener noreferrer" title={value.title} href={value.link} >
                        {value.title}
                      </a>
                      <p>Company: {value.brandName}</p>
                      <Divider />
                    </div>
                  }
                  {(typeof (value) === "object" && (props.panelHeading === "Regulatory Watch" || props.panelHeading === "Press Release" || props.panelHeading === "Industry News" || props.panelHeading === "Person Watch")) && //*changes for CI-98,99 by 1442613*//
                    <div className="linkContainer" >
                      <a title={value.title} target="_blank" href={value.link}>{value.title}</a>
                      <p className="datePublicationSourceWrapper margin0"><span>Source: {value.source}</span><span class="pull-right">{value.pubDate}</span></p>
                      <Divider />
                    </div>
                  }
                  {(typeof (value) === "object" && (props.panelHeading === "Competitors News" )) &&
                    <div className="linkContainer" >
                      < FontAwesomeIcon icon={faLock} />
                      <a title={value.title} target="_blank" href={value.link}>{value.title}</a>
                      <p className="datePublicationSourceWrapper margin0"><span>Source: {value.source}</span><span class="pull-right">{value.pubDate}</span></p>
                      <Divider />
                    </div>
                  }
                  {(typeof (value) === "object" && props.panelHeading === "Patent Watch") &&
                    <div className="patentWatchWrapper">
                      <a target="_blank" rel="noopener noreferrer" title={value.title} href={value.link} >
                        {value.title}
                      </a>
                      <div><span>Inventors: {value.inventors}</span></div>
                      <div className="row patentDetailsWrapper margin0">
                        <div className="col-sm-6 padding0"><span>Company: {value.brandName}</span></div>
                        <div className="col-sm-6 padding0"><span>Publish Date: {value.publishDate}</span></div>
                      </div>
                      <div className="row patentDetailsWrapper margin0">
                        <div className="col-sm-6 padding0"><span>Application #: {value.applicationNumber}</span></div>
                        <div className="col-sm-6 padding0"><span>UPSTO Class: {value.upstoClass}</span></div>
                      </div>
                      <Divider />
                    </div>
                  }
                  {/* Added divider after each div as per requirement of Product Information by Rati */}
                  {(typeof (value) === "object" && props.panelHeading === "Product Information") &&
                    <div className="patentWatchWrapper">

                      <table class="table">
                    
                    <tbody>
                      <tr>
                        <td>Product :</td>
                          <td>{value.title}
                         </td>
                      </tr>
                      <tr>
                        <td>Therapeutic Area :</td>
                          <td>{value.TA}</td>
                      </tr>
                      <tr>
                        <td>Molecule :</td>
                          <td>{value.molecule}</td>
                      </tr>
                      <tr>
                        <td>ATC3 :</td>
                        {value.ATC3.map((ATC3, index) => (
                          <td>{ATC3} </td>
                          ))}
                      </tr>
                      <tr>
                        <td>Indication :</td>
                          <td>{value.indication}</td>
                      </tr>
                    </tbody>
                  </table>
               
                    </div>}
                {/* Added divider after each div as per requirement of Product Information by Rati */}
                  {(typeof (value) === "object" && props.panelHeading === "Congress Planner") &&
                    <div className="congressPlannerWrapper">
                      <a target="_blank" rel="noopener noreferrer" title={value.title} href={value.link} >
                        {value.title}
                      </a>
                      <div className="row patentDetailsWrapper margin0">
                        <div className="col-sm-6 padding0"><span>{value.date}</span></div>
                        <div className="col-sm-6 padding0"><span>{value.location}</span></div>
                      </div>
                      <Divider />
                    </div>
                  }
                  {(typeof (value) === "object" && props.panelHeading === "My Alerts") &&
                    <div>
                      {value.title.map((item, index) => (
                        <div>
                          <span className="greyText">{item}</span>
                          <Divider />
                        </div>
                      ))}

                    </div>
                  }
                  {typeof (value) !== "object" &&
                    <div>
                      <a href="#">{value}</a>
                      <Divider />
                    </div>
                  }
                </div>
              ))}
              {(props.panelHeading === "Licensing") &&
                <div className="licensingWrapper">
                  <table class="table">
                    <thead>
                      <tr>
                        <th></th>
                        {props.cardContent.map((value, index) => (
                          <th>{value.country}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>License</td>
                        {props.cardContent.map((value, index) => (
                          <td>{value.License}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>LOE</td>
                        {props.cardContent.map((value, index) => (
                          <td>{value.LOE}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Registration</td>
                        {props.cardContent.map((value, index) => (
                          <td>{value.registration}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              }
              {/* {props.cardContent.map((value, index) => (
                <div className="LicensingWrapper">
                  {(typeof (value) === "object" && props.panelHeading === "Licensing") &&
                    <div className="">
                      <div className="row">
                        <div className="col-xs-12 col-sm-1">
                          <span>{value.country}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-1">
                          <span>{value.country}</span>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                          <span>{value.License}</span>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                          <span>{value.LOE}</span>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                          <span>{value.registration}</span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              ))} */}
            </div>
          }
          {props.cardContent.length === 0 &&
              <div>
              <NoRecordFoundMessage/>
              </div>
            // <span className="norecordFound">
            //   </span>
          }
        </div>
      </CardContent>
    </Card>
  );
}

SimpleCardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCardComponent);
