import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Bookmark from '@material-ui/icons/Bookmark';
import BarGraph from '@material-ui/icons/BarChart';
import ViewQuilt  from "@material-ui/icons/ViewQuilt";
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { SavesearchKeyword, SearchContent, setCurrentView, RibonTabSelected } from '../../Actions/ActionSearchFunction';
import * as types from '../../Actions/ActionTypes';
import { store } from "../../Store/Store";
import Logo from '../../Assets/Header/resizeimage1.png';
import Logoalt from '../../Assets/Header/logo.png';
import classnames from "classnames";
import tinycolor from 'tinycolor2';
import Novartis from '../../Assets/Header/novartis-logo.svg';
// import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import UserAvatar from './userAvatar';
import classNames from "classnames";
import Notification from './notification';
//import BookmarkDropdown from './bookmarkDropdown';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IntegrationAutosuggestHeader from '../CIP/GenericComponents/IntegrationAutosuggest/IntegrationAutosuggestHeader';
// import Divider from '@material-ui/core/Divider';

//component import

import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import { EILSEQ } from 'constants';
import {urlStrings} from '../../_helpers/urlStrings';


const notifications = [
  { id: 0, color: "secondary", message: "Check out this awesome ticket", time: "1 min ago" },
  {
    id: 1,
    color: "primary",
    type: "info",
    message: "What is the best way to get ...",
    time: "1 min ago"
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a notification",
    time: "4 mins ago"
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 orders has arrived today",
    time: "7 mins ago"
  }
];

var bookmarks=localStorage.getItem("bookmarkList")!=null ?JSON.parse(localStorage.getItem("bookmarkList")):[];


const messages = [
  {
    id: 0,
    variant: "warning",
    name: "Jane Hew",
    message: "Hey! How is it going?",
    time: "1 min ago..."
  },
  {
    id: 1,
    variant: "success",
    name: "Lloyd Brown",
    message: "Check out my new Dashboard",
    time: "4 mins ago..."
  },
  {
    id: 2,
    variant: "primary",
    name: "Mark Winstein",
    message: "I want rearrange the appointment",
    time: "40 mins ago..."
  },
  {
    id: 3,
    variant: "secondary",
    name: "Liana Dutti",
    message: "Good news from sale department",
    time: "2 hrs ago..."
  }
];

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  Menu: {
    top: '13%',
    right: '7%'

  },

  menuButton: {
    marginLeft: -12,
    // marginRight: 20,
  },
  barIconButton:{
    '&:hover':{
      textDecoration: 'none',
      color:'inherit'
    }
  },
  button: {
    margin: '0px',
    marginTop: theme.spacing.unit * 3,
    padding: '0px',
    border: 'none',
    fontSize: '12px',
    fontWeight: '200',

    // border: '1px solid #484668',
    textTransform: 'none'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit,
    marginLeft: 4,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  advance: {
    position: 'absolute',
    top: '11%',
    left: '74%',
    color: '#fff',
    padding: '5px'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize:'12px'
    /*as per new requirement change width will be fixed*/
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   '&:focus': {
    //     width: 200,
    //   },
    // },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light
    }
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",

    // alignItems: "center",
    marginRight: theme.spacing.unit * 2
  },
  messageNotificationBodySide: {
    // alignItems: "flex-start",
    marginRight: 0,
    flexBasis: '100%',
  },
  headerMenuItem: {
    paddingLeft: '6px',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 8,
  },
  anchorStyle:{
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
    '&:hover':{
      textDecoration: 'none'
    }
  },
  bookmarkContainer: {
    display: "flex",
    alignItems: "center",
    flexBasis:'100%'
  },
  notificationContained: {
    borderRadius: 45,
    height: 45,
    // boxShadow: theme.customShadows.widgetDark
  },
  notificationContainedShadowless: {
    boxShadow: 'none',
  },
  bookmarkIconContainer: {
    minWidth: 45,
    height: 45,
    borderRadius: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: "#F50057"
  },
  notificationIconContainerContained: {
    fontSize: 18,
    color: '#FFFFFF80',
  },
  notificationIconContainerRounded: {
    marginRight: theme.spacing.unit * 2,
  },
  containedTypography: {
    color: "white"
  },
  bookmarkmessageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    // textOverflow: "ellipsis"
  },
  extraButton: {
    color: 'white',
    '&:hover, &:focus': {
      background: 'transparent',
    }
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    anchorE2: null,
    anchorE3: null,
    anchorE4: null,
    mobileMoreAnchorEl: null,
    searchKeyword: '',
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
      open: true,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.Pageurl === 'Search' && nextProps.Pageurl !== 'Search') {
      setTimeout(() => this.setState({ searchKeyword: '' }), 0);
      this.props.dispatch(SavesearchKeyword(''));
    }
    else if (nextProps.searchKeyword !== null && nextProps.searchKeyword !== undefined) {
      if (typeof (nextProps.searchKeyword) === 'string') {
        // this.setState({ searchKeyword: nextProps.searchKeyword});
      }
    }
  }

  handleProfileMenuOpen = name => event => {
    this.setState({ [name]: event.currentTarget });
    bookmarks=localStorage.getItem("bookmarkList")!=null ?JSON.parse(localStorage.getItem("bookmarkList")):[];
  };
  HandleNotificationClose = () => {
    this.setState({ anchorE2: null });
  }
  HandleBookmarkClose = () => {
    this.setState({ anchorE4: null });
   
  
  }
 
  HandleBookmark = (bookmark) => {
    this.props.dispatch(setCurrentView(types.HOME, {"userName":this.state.userName,"tabSelected":6,"myViewName": bookmark}));
    this.props.dispatch(RibonTabSelected(6));
    this.setState({ anchorE4: null });
  }


  HandleMessagesClose = () => {
    this.setState({ anchorE3: null });
  }
  handleMenuClose = (event) => {
    this.setState({ anchorEl: null });
    if (event === "My Preference") {
      this.props.dispatch(setCurrentView(types.PREFERENCE, { "userName": this.state.userName, "tabSelected": event }))
    } else if (event === "Alerts") {
      this.props.dispatch(setCurrentView(types.ALERTS, { "userName": this.state.userName, "tabSelected": event }))
    } else if (event === "ManageUsers") {
      this.props.dispatch(setCurrentView(types.MANAGEUSERS, { "userName": this.state.userName, "tabSelected": event }))
    } else if (event === "ManageSources") {
      this.props.dispatch(setCurrentView(types.MANAGESOURCES, { "userName": this.state.userName, "tabSelected": event }))
    }

    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {

    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  onClick() {
    this.props.dispatch(SavesearchKeyword(this.state.searchKeyword));
    setTimeout(() => this.setState({ searchKeyword: this.props.searchKeyword }), 0);
    let trimvalue = this.state.searchKeyword !== undefined && this.state.searchKeyword !== null ? this.state.searchKeyword.trim() : '';
    if (trimvalue.length > 0) {
      this.props.dispatch(setCurrentView(types.SEARCH))
    }
  }
  redirectHome = () => {
    store.dispatch(RibonTabSelected(0));
    store.dispatch(setCurrentView(types.HOME, { "userName": this.state.userName, "tabSelected": 0 }));
    
  }
  handleAdvance = () => {
    this.props.dispatch(setCurrentView(types.ADVANCESEARCH))
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.dispatch(SavesearchKeyword(this.state.searchKeyword));
      let trimvalue = this.state.searchKeyword !== undefined && this.state.searchKeyword !== null ? this.state.searchKeyword.trim() : ''
      if (trimvalue.length > 0) {
        this.props.dispatch(setCurrentView(types.SEARCH));
        setTimeout(() => this.setState({ searchKeyword: '' }), 0);
      }
    }
  }

  handleChange = (event, value) => {
    this.setState({ searchKeyword: event.target.value })
  };

  landToViewAllNotification =() => {
    this.HandleNotificationClose();
    store.dispatch(setCurrentView(types.VIEWALLNOTIFICATION));
    
}
  handleBurgerMenu = (e, value) => {
    console.log('handle hit')
    store.dispatch(RibonTabSelected(value));
    store.dispatch(setCurrentView(types.HOME, { "userName": this.state.userName, "tabSelected": value }));
  }
  handleBurgerSubMenu = (e, text) => {
    console.log(text)
    if (text === 'Pipeline Dashboard') {
      store.dispatch(RibonTabSelected(3));
      store.dispatch(setCurrentView(types.HOME, { "userName": this.state.userName, "tabSelected": 3 }));
    } else if (text === 'Clinical Trial Dashboard') {
      store.dispatch(RibonTabSelected(3));
      store.dispatch(setCurrentView(types.HOME, { "userName": this.state.userName, "tabSelected": 5 }));
    } else if (text === 'Usage Analytics Dashboard') {
      store.dispatch(RibonTabSelected(3));
      store.dispatch(setCurrentView(types.HOME, { "userName": this.state.userName, "tabSelected": 4 }));
    }

    // else if (text === 'My View 1') {
    //   store.dispatch(RibonTabSelected(6));
    //   store.dispatch(setCurrentView(types.HOME, { "userName": this.state.userName, "tabSelected": 6 }));
    // }
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { anchorEl, anchorE2, anchorE3,anchorE4, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMenuOpenNotification = Boolean(anchorE2);
    const isMenuOpenMessages = Boolean(anchorE3);
    const isMenuOpenBookmarks = Boolean(anchorE4);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const sideList = (
      <div className={classes.list}>
        <List>
          {/* {['Home', 'Disease Area', 'Brand View', ['Dashboards', ['Pipeline Dashboard', 'Clinical Trial Dashboard', 'Usage Analytics Dashboard']], ['My View', []]].map((text, index) => ( */}
            {['Home', 'Disease Area', 'Brand View', ['Dashboards', ['Pipeline Dashboard', 'Clinical Trial Dashboard', 'Usage Analytics Dashboard']], ['My View', []]].map((text, index) => (
            <div key={index} className="sideBarContentWrapper">
              {index !== 3 && index !== 4 ? <><ListItem button key={text} onClick={(e) => this.handleBurgerMenu(e, index)}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
                <Divider /> </> :
                <><ListItem button key={text[0]} >
                  <ListItemText primary={text[0]} /></ListItem><Divider />
                  <List>
                    {text[1].map((text, index = 3) => (

                      <><ListItem className={classes.nested} button key={text} onClick={(e) => this.handleBurgerSubMenu(e, text)}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary={text} />
                      </ListItem>
                      </>
                    ))}
                  </List>
                  {/* <Divider /> */}
                </>
              }
            </div>
          ))}
        </List>
      </div>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        className={'MenuPosition'}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      > <MenuItem onClick={() => this.handleMenuClose('My Preference')}>Preferences</MenuItem>
        <MenuItem onClick={() => this.handleMenuClose('Alerts')}>Alerts</MenuItem>
        <MenuItem onClick={() => this.handleMenuClose('ManageUsers')}>Manage Users</MenuItem>
        <MenuItem onClick={() => this.handleMenuClose('ManageSources')}>Manage Sources</MenuItem>
        <MenuItem><a href={urlStrings.logoutURL} className={classes.anchorStyle}>Logout</a></MenuItem>
      </Menu>
    );

    const renderNotification = (
      <Menu
        anchorE2={anchorE2}
        className={'MenuPosition'}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpenNotification}
        onClose={this.HandleNotificationClose}
      >
        {notifications.map(notification => (
          <MenuItem
            key={notification.id}
            onClick={this.HandleNotificationClose}
            className={classes.headerMenuItem}
          >
            <Notification {...notification} typographyVariant="inherit" />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem style={{ display: 'block', textAlign: 'center' }} onClick={this.landToViewAllNotification}>View All Notification</MenuItem>
      </Menu>
    );
    const renderMessages = (
      <Menu
        anchorE3={anchorE3}
        className={'MenuPosition'}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpenMessages}
        onClose={this.HandleMessagesClose}
      >{messages.map(message => (<MenuItem key={message.id} className='itemsMenu' onClick={this.HandleMessagesClose}>

        <div className={classes.messageNotificationSide}>
          <UserAvatar xyz={message.variant} name={message.name} />

        </div>
        <div
          className={classNames(
            classes.messageNotificationSide,
            classes.messageNotificationBodySide
          )}
        >
          <div className='topMessageBody'>

            <Typography className='messagetypography' weight="medium" gutterBottom>
              {message.name}
            </Typography>
            <Typography size="sm" color="textSecondary">
              {message.time}
            </Typography>
          </div>
          <Typography className='messagetypography' color="textSecondary">{message.message}</Typography>
        </div>

      </MenuItem>

      ))}
        <Divider />
        <MenuItem style={{ display: 'block', textAlign: 'center' }} onClick={this.HandleMessagesClose}>View All Messages</MenuItem>
      </Menu>
    );
    
    const renderBookmark= (
      <Menu
      anchorE4={anchorE4}
      className={'BookmarkMenuPosition'}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpenBookmarks}
      onClose={this.HandleBookmarkClose}
    >{bookmarks.map(bookmark => (
   <MenuItem key={bookmark} className={classes.headerMenuItem} onClick={this.HandleBookmark.bind(this,bookmark)}>
      <div
      className={classnames(classes.bookmarkContainer)}
      // style={{
      //   backgroundColor:
      //     variant === "contained" &&
      //     theme.palette[props.color] &&
      //     theme.palette[props.color].main
      // }}
    >
      <div
        className={classnames(classes.bookmarkIconContainer
        )}
        // style={{
        //   backgroundColor: variant === "rounded" &&
        //   theme.palette[props.color] &&
        //   tinycolor(theme.palette[props.color].main).setAlpha(0.15).toRgbString()
        // }}
      ><ViewQuilt /></div>
      <div className={classes.bookmarkmessageContainer}>
        <Typography
        
          variant="inherit"
          // size={variant !== "contained" && !props.typographyVariant && "md"}
        >
          {bookmark}
        </Typography>
        <Typography
          // className={classnames({
          //   [classes.containedTypography]: variant === "contained"
          // })}
           variant="inherit"
          color='primary'
          //  size={variant !== "contained" && !props.typographyVariant && "md"}
        >
          {/* {"1 min ago"} */}
        </Typography>
      </div>
    </div>
    </MenuItem>

    ))}
      {/* <Divider />
      <MenuItem style={{ display: 'block', textAlign: 'center' }} onClick={this.HandleMessagesClose}>View All Messages</MenuItem> */}
    </Menu>
    )
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
      {/* Added bookmarks row in mobile view */}
      <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit"  className={classes.barIconButton} href={urlStrings.URLRedirectToMainHome}>
             <BarGraph />
          </IconButton>
          <p>FoundationHome</p>
        </MenuItem>
       <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Bookmark />
          </IconButton>
          <p>Bookmarks</p>
        </MenuItem>
      {/* Added bookmarks row in mobile view */}

        {/* Updated onClick method to open tabs in mobile view */}
        <MenuItem onClick={this.handleProfileMenuOpen('anchorE3')}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem  onClick={this.handleProfileMenuOpen('anchorE2')}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem  onClick={this.handleProfileMenuOpen('anchorEl')}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        {/* Updated onClick method to open tabs in mobile view */}
      </Menu>
    );

    return (
      <div className="appBarWrapper">
        <AppBar position="static" color='primary'>
          <Toolbar>
          <Grid flexGrow="1">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer('left', true)}>
              <MenuIcon className={classes.menuIcon}/>
            </IconButton>
            <SwipeableDrawer
              open={this.state.left}
              onClose={this.toggleDrawer('left', false)}
              onOpen={this.toggleDrawer('left', true)}
            >
              <div className="sideBarWrapper"
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </SwipeableDrawer>
            </Grid>
            {/* <Typography className={classes.title} variant="div" color="inherit" noWrap> */}
              {/* {this.props.client === "Novartis" &&
                <img className='NovartisLogo' src={Novartis} alt='Novartis' />
              } */}
              <Hidden smDown >
              <img className='headerLogo' src={Logo} alt='CIP' onClick={this.redirectHome}/>
              </Hidden >
              {/* <img  className='' src={Novartis} alt='Novartis' /> */}
            {/* </Typography> */}
            <Hidden smUp >
            <img className='headerLogo' src={Logoalt} alt='CIP'  onClick={this.redirectHome}/>
            </Hidden>
            <span className="subHeading">Market Intelligence</span>
            {/* </Hidden> */}
            <Hidden smDown > 
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon} onClick={this.onClick.bind(this)}>
                <SearchIcon />
              </div>
              {/* <InputBase
                placeholder="Search…"
                value={this.state.searchKeyword}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this._handleKeyPress.bind(this)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              /> */}
              <IntegrationAutosuggestHeader type="header" />
            </div>
             
            <div>
              <Button onClick={this.handleAdvance}
                variant="outlined" style={{}} className={classes.button}>
                <span className="advancedSearchWrapper">Advanced</span>
                {/* <div className={classes.advance} onClick={this.onClick.bind(this)}>
                <SearchIcon />
              </div> */}

              </Button>

            </div>

            </Hidden> 
            <div className="headerIconWrapper">
              <Grid flexGrow="1">
              <Hidden smUp >  
              <IconButton style={{"position":"absolute","right":"0","top":"5px"}}
                  // aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  // aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen('mobileMoreAnchorEl')}
                  color="inherit">
                  <MoreVertIcon />
              </IconButton>
              </Hidden>
              <Hidden smDown >
              <IconButton
                // onClick={this.handleProfileMenuOpen('anchorE3')}
                color="inherit"  className={classes.barIconButton} href={urlStrings.URLRedirectToMainHome}>
                {/* <Badge badgeContent={7} color="secondary"> */}
                <BarGraph />
                {/* </Badge> */}
              </IconButton>
              <IconButton
                 onClick={this.handleProfileMenuOpen('anchorE4')}
                color="inherit">
                {/* <Badge badgeContent={7} color="secondary"> */}
                <Bookmark />
                {/* </Badge> */}
              </IconButton>
              <IconButton
                onClick={this.handleProfileMenuOpen('anchorE3')}
                color="inherit">

                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>

              </IconButton>

              <IconButton
                onClick={this.handleProfileMenuOpen('anchorE2')}
                color="inherit">
                <Badge badgeContent={5} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen('anchorEl')}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              </Hidden>
              </Grid>
              {renderMobileMenu}
            </div>
          </Toolbar>
          {/* <Notification /> */}
          {renderMessages}
          {renderNotification}
          {bookmarks.length>0 && renderBookmark}
          {/* Added search bar for responsive mobile view */}
          <Hidden mdUp>
          <Toolbar>
               <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon} onClick={this.onClick.bind(this)}>
                <SearchIcon />
              </div>
              {/* <InputBase
                placeholder="Search…"
                value={this.state.searchKeyword}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this._handleKeyPress.bind(this)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              /> */}
              <IntegrationAutosuggestHeader type="header" />
            </div>
            <div>
              <Button onClick={this.handleAdvance}
                variant="outlined" className={classes.button}>
                <span className="advancedSearchWrapper">Advanced</span>
              </Button>
            </div>
            </Toolbar>
            </Hidden>
        {/* Added search bar for responsive mobile view */}
        </AppBar>

        {renderMenu}
        {renderMobileMenu}

      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.SavedSearchesModalReducer.searchKeyword,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PrimarySearchAppBar));