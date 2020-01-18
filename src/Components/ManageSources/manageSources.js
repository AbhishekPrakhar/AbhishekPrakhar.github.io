import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircle from '@material-ui/icons/AddCircle';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import RssFeed from '@material-ui/icons/RssFeed';
import Books from '@material-ui/icons/LibraryBooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import {  faEdit, faRss} from '@fortawesome/free-solid-svg-icons';
import Chip from '@material-ui/core/Chip';
import RssData from '../../json/rss.json';
import AddSource from './addSource';
import BreadCrumbs from '../CIP/GenericComponents/BreadCrumbs/breadCrumbs';


import './manageSources.css';
import { getMilliseconds } from 'date-fns/esm';


const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
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
    //   backgroundColor: fade(theme.palette.common.white, 0.15),
    //   '&:hover': {
    //     backgroundColor: fade(theme.palette.common.white, 0.25),
    //   },
    backgroundColor:'lightgrey',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  });

 


class ManageSources extends Component {
    constructor(props){
      
        super(props)
        this.state={
            open: false,
            selectedRow:null,
            data:RssData,
            active:'',
            page: 0,
            rowsPerPage: 5,
    
        }
    }


    componentWillMount(){

    }

    handleClose = () => {
        this.setState({ open: false,
        selectedRow:null
        });
      };
    
    
    
    
    handleSave = (props)=>{
    
        console.log(props,this.state.data, 'checking whats coming')
             const { data } =this.state;
             let index = -1;
             data.map(item=>{
               if (item._id===props._id){
                // console.log(index,'index')
                    return  index = data.indexOf(item);
                
                //  data[index]=props;
               }else{ return null}
             })
             if (index===-1){
               props._id = new Date().getMilliseconds()+new Date().getTime();
               props.tags= props.tags.map(item=>item.value)
               data.unshift(props)
             }else{
                 props.tags= props.tags.map(item=>item.value)
               data[index]=props;
             }
            this.setState({data})
            this.handleClose();
          }
    
    
    handleActive=(name)=>{
         this.setState({active:name})
    }



    handleOpen = (e,n) => {
        console.log(e,n ,'checking whats coming')
        if(n===undefined){
          this.setState({ open: true });
        }else if (n!==undefined ){
          this.setState({
            open:true,
            selectedRow:n
          })
        }
        
       
      };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
      };
    
    handleChangePage = (event, page) => {
        this.setState({ page });
      };


    renderIcons=(type)=>{
        console.log(type)
        switch(type){
            case 'rss':
            return <div>< FontAwesomeIcon className='brandsIcons' icon={faRss}/></div>
        }
    }

    render () {
        const classes = this.props.classes;
        console.log(RssData)

        const {rowsPerPage, page , data } = this.state;
        const PageEndLimit = (this.state.page +1)* rowsPerPage;
        const pageStartLimit = PageEndLimit - rowsPerPage;
        let ThrottleData=data.slice(pageStartLimit,PageEndLimit)


        return (
            <div className='manageSourcesWrapper'>
            <BreadCrumbs PageName='Manage Source' TabName='Home' TabValue ='0'/>
                <div className='manageSourcesAddSources'>
                <Tooltip title="Add Source">
            <IconButton aria-label="Filter list" 
            onClick={this.handleOpen}
            >
              <AddCircle   />
            </IconButton>
          </Tooltip>
                
                </div>
                <div className='manageSourcesBodyLayout'>
                <div className='manageSourcesTabSelectorsWrapper'>
                
                        <List component="nav">
                        <ListItem button onClick={()=>this.handleActive('')}>
                        {/* <ListItemIcon>
                            <RssFeed />
                        </ListItemIcon> */}
                        <ListItemText  primary="All Sources" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={()=>this.handleActive('RSS')} className={this.state.active==='RSS'?'activeSource rss':'rss'}>
                        <ListItemIcon>
                            <RssFeed />
                        </ListItemIcon>
                        <ListItemText primary="RSS" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={()=>this.handleActive('News')} className={this.state.active==='News'?'activeSource news':'news'}>
                        <ListItemIcon>
                           <Books />
                        </ListItemIcon>
                        <ListItemText primary="News" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={()=>this.handleActive('Twitter')} className={this.state.active==='Twitter'?'activeSource twitter':'twitter'}>
                        <ListItemIcon>
                        < FontAwesomeIcon className='brandsIcons' icon={['fab', 'twitter']}/>
                         
                        </ListItemIcon>
                        <ListItemText primary="Twitter" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={()=>this.handleActive('Facebook')} className={this.state.active==='Facebook'?'activeSource facebook':'facebook'}>
                        <ListItemIcon>
                        < FontAwesomeIcon className='brandsIcons' icon={['fab', 'facebook']}/>
                        </ListItemIcon>
                        <ListItemText primary="Facebook" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={()=>this.handleActive('GooglePlus')} className={this.state.active==='GooglePlus'?'activeSource googleplus':'googleplus'}>
                        <ListItemIcon>
                        < FontAwesomeIcon className='brandsIcons' icon={['fab', 'google-plus']} />
                        </ListItemIcon>
                        <ListItemText primary="GooglePlus" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={()=>this.handleActive('YouTube')} className={this.state.active==='YouTube'?'activeSource youtube':'youtube'}>
                        <ListItemIcon>
                        < FontAwesomeIcon className='brandsIcons' icon={['fab', 'youtube']} />
                        </ListItemIcon>
                        <ListItemText primary="YouTube" />
                        </ListItem>
                        <Divider />
                    </List>
                
                
                </div>
                <div className='manageSourcesTableWrapper'>

                <div >
                <div>All Sources</div>
                        <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        />
                    </div>
                
                </div>
                {/* changes for tiles below search button */}
              {ThrottleData.map(item=>{

                  return (
                    <div  key ={item._id}className='SourcesTile'> 
                    
                        {this.renderIcons(item.type)}
                        
                    <div>
                           <div className='typeTitleIcon'>
                               <div>{item.title}</div>
                               <div>< FontAwesomeIcon onClick={(e)=>this.handleOpen(e,item)} className='brandsIcons' icon={faEdit}/></div>
                           </div>
                           <div><a target ='_blank' href= 'https://google.com'>{item.source}</a></div>
                           <div className='tagChips'>{item.tags.map((item , index)=>{
                               return <Chip key ={index} label={item} className={classes.chip} />
                           })}</div>
  
                    </div>
  
                  </div>

                  )
              })}
              <div  className='Pagination'>
                             <Table>
                         <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                // ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                         </TableFooter> 
                         </Table>   
                             </div>   



               <AddSource selectedRow={this.state.selectedRow} handleSave={this.handleSave} handleClose={this.handleClose} open={this.state.open}/>
                </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ManageSources);