import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faLockOpen,faLock,faUser,faTags,faTag , faBookmark ,faUserTag, faShareAlt,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {store} from '../../Store/Store';
import {RibonTabSelected,setCurrentView} from '../../Actions/ActionSearchFunction';
import * as types from '../../Actions/ActionTypes';

const styles = {
  grid:{
    margin:'20px auto',
    width: 'calc(100% + -120px)'
  },
  card: {
    fontSize:15,

    minWidth:"100%",
    width:'inherit'
  },
  cardWrapper:{
    // padding:'0 25px'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  // icon:{
  //   color: '#fff',
  //   verticalAlign: 'super',
  //   margin: '10px'
  // },
  // date:{
  //   float:'right',
  //   color:'#fff',
  //   minWidth: '11%',
  //   padding:'4px 0px',
  // },
  author:{
    marginLeft:'10px',
  },
  body:{
    marginLeft:'10px',
  },
  chip:{
    margin:'10px',
  },
  bookmark:{
    display:'flex',
    justifyContent:'flexEnd',
  },
  // source:{
  //   padding:'10px 0 0',
  //   color:'#fff'
  // },
  header:{
    fontSize:'110%',

    margin:'0',
  },
  buttonDiv:{
    padding:'4px 0px',
  },
  button:{
    justifyContent:'space-between',
    fontSize: '1rem',
    // background: '#AAABB8',
    padding:'0',
    
  }  ,

};

const handleProfileView = (props)=>{
  
  store.dispatch(RibonTabSelected(2));
  store.dispatch(setCurrentView(types.HOME, {"userName":'',"tabSelected":2,"obj":props}));
}

function ImgMediaCard(props) {
  const { classes } = props;
  console.log(props)
  return (
    <Grid container 
    spacing={24}
    alignItems="flex-end"
    direction="column"
    className={classes.grid}

    > 
    <Card className={classes.card}>
    {props.activeKey===4?null:
    <CardActions className={classes.button +' searchResultsButton'}>

        <Button size="small" color="primary" className={classes.buttonDiv}>
        <Typography inline className={classes.header +' searchResultsheader'} gutterBottom variant="h6" component="h2">
           {props.lock?< FontAwesomeIcon className='searchResultsLockIcon'  icon={faLock} />:
           < FontAwesomeIcon  className='searchResultsLockIcon' icon={faLockOpen} /> }
            
            {props.journalTitle}
          </Typography>
          
          </Button>
          <Typography inline className='searchResultsDate' component="p">
            03-Sep-2015
            
          </Typography>}
          
       
      </CardActions>}
      {props.activeKey===4?null:
      <CardActions className={classes.button+ ' searchResultsButton'}>
          <Typography  className='searchResultsSource' component="p">
            Source Name: {props.source}
            
          </Typography>

         <Typography  className='searchResultsSource' component="p" >
          < FontAwesomeIcon icon={faUser} /> 
          <Typography  inline className={classes.author +' seacrhResultsAuthor'}  component="p" >
          Devesh Pathak
          </Typography>
          </Typography>
          </CardActions>}
      <CardActionArea className={classes.cardWrapper + ' contentWrapper'}>
      {props.activeKey===4?
      <div className='productViewWrapper'> 
      <CardContent>
            <Typography  className={classes.body + ' productWrapper'} component="p">
          Brand Name: {props.title}
          </Typography>
          <Typography className={classes.body + ' productWrapper'} component="p">
          Molecule: {props.Molecule_Name}
          </Typography>
          <Typography className={classes.body + ' productWrapper'} component="p">
          TA: {props.Therapeutic_Area}
          </Typography>
        </CardContent>
        <div onClick={()=>handleProfileView(props)}>View Brand Profile</div>
      </div>
      :
        <CardContent>
            <Typography  className={classes.body} component="p">
            {props.articleTitle}
          </Typography>
          <Typography inline component="p">
          < FontAwesomeIcon icon={faTags} />
            
          </Typography>
          <div className='chipWrapper'>
          <Chip
              icon={ < FontAwesomeIcon icon={faTag} />}
              label={props.keywordList}
              className={classes.chip}
              variant="outlined"
           />
           <CardActions id="searchResultsButtonbookmark" className={classes.button +' searchResultsButton'}>
        <div className='bookmark'>
          < FontAwesomeIcon className='icon' icon={faUserTag} />
          < FontAwesomeIcon className='icon' icon={faShareAlt} style={{marginLeft:'15px'}}/>
          < FontAwesomeIcon className='icon' icon={faEnvelope} style={{marginLeft:'15px'}}/>
          < FontAwesomeIcon className='icon' icon={faBookmark} style={{marginLeft:'15px'}}/>
          
          </div>
      </CardActions>
           </div>

        </CardContent>}
        
      </CardActionArea>
      {/* <CardActions id="searchResultsButtonbookmark" className={classes.button +' searchResultsButton'}>
        <div className='bookmark'>
          < FontAwesomeIcon className='icon' icon={faUserTag} />
          < FontAwesomeIcon className='icon' icon={faShareAlt} style={{marginLeft:'15px'}}/>
          < FontAwesomeIcon className='icon' icon={faEnvelope} style={{marginLeft:'15px'}}/>
          < FontAwesomeIcon className='icon' icon={faBookmark} style={{marginLeft:'15px'}}/>
          
          </div>
      </CardActions> */}
    </Card>
    </Grid>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);