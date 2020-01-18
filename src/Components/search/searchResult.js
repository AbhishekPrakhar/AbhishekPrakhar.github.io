import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './searchResultCard';
import Data from '../../json/search.json';
import Pubmet from '../../json/pubmed.json';
import Filter from './SearchResultsList';
import Event from '../../json/event.json';
import Products from '../../json/products.json';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';
// import Pagination from "react-js-pagination";
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';
import Badge from '@material-ui/core/Badge';
import BreadCrumbs from '../CIP/GenericComponents/BreadCrumbs/breadCrumbs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFileExport , faSave} from '@fortawesome/free-solid-svg-icons';
import SaveSearch from './saveResults';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import NoRecordFoundMessage from '../../Components/CIP/GenericComponents/NoRecordFoundMessage/NoRecordFoundMessage';
import './search.css';
class Search extends Component {
        
    state={
            activePage: 1,
            activeKey:1,
            page: 0,
            rowsPerPage: 5,
            opne:false,
            sort:10
        }

    componentWillMount(){
        let activeTab=1;
       console.log(this.props,Data,"props available")

       if(typeof(this.props.keyword)==='object'){
           const { Title , Author, Tags, From, To}=this.props.keyword;

           const filtered= Data.filter(item=>{
            const Heading = item.journalTitle.toLowerCase();
            const About = item.articleTitle.toLowerCase();
            
            console.log(Heading,About,"filtered data")
            if (Heading.includes(Title.toLowerCase())
            //  ||  About.includes(text)
                ){
                console.log(item,"checkitem")
                return item;
            }else{return null}
            
       })
       const filteredPubmet= Pubmet.pubmedDataDetails.filter(item=>{
        const Heading = item.journalTitle.toLowerCase();
        const About = item.articleTitle.toLowerCase();
        
        console.log(Heading,About,"filtered data")
        if (Heading.includes(Title.toLowerCase()) 
        // ||  About.includes(text)
    ){
            console.log(item,"checkitem")
            return item;
        }else{return null}
        
   })
   

   const filteredProducts= Products.filter(item=>{
    const molecule = item.Molecule_Name.toLowerCase();
    const product = item.title.toLowerCase();
    const TA = item.Therapeutic_Area.toLowerCase();
    
    // console.log(Heading,About,"filtered data")
    if (molecule.includes(Title.toLowerCase())
    ||  product.includes(Title.toLowerCase())
    ||  TA.includes(Title.toLowerCase())
){
        // console.log(item,"checkitem")
        return item;
    }else{return null}
    
})
const filteredEvent= Event.filter(item=>{
    const Heading = item.journalTitle.toLowerCase();
    const About = item.articleTitle.toLowerCase();
    
    console.log(Heading,About,"filtered data")
    if (Heading.includes(Title.toLowerCase()) 
    // ||  About.includes(text)
){
        console.log(item,"checkitem")
        return item;
    }else{return null}
    
})
       
        console.log(filteredPubmet,"filtered data")
        this.setState({filtered , filteredPubmet,filteredEvent,filteredProducts})
       
       
        }

       if(typeof(this.props.keyword)==='string'){
       const text = this.props.keyword.toLowerCase();

       const filtered= Data.filter(item=>{
            const Heading = item.journalTitle.toLowerCase();
            const About = item.articleTitle.toLowerCase();
            
            console.log(Heading,About,text,"filtered data")
            if (Heading.includes(text) ||  About.includes(text)){
                console.log(item,"checkitem")
                return item;
            }else{return null}
            
       })
       const filteredPubmet= Pubmet.pubmedDataDetails.filter(item=>{
        const Heading = item.journalTitle.toLowerCase();
        const About = item.articleTitle.toLowerCase();
        
        console.log(Heading,About,text,"filtered data")
        if (Heading.includes(text) ||  About.includes(text)){
            console.log(item,"checkitem")
            return item;
        }else{return null}
        
   })

   const filteredEvent= Event.filter(item=>{
    const Heading = item.journalTitle.toLowerCase();
    const About = item.articleTitle.toLowerCase();
    
    console.log(Heading,About,text,"filtered data")
    if (Heading.includes(text) ||  About.includes(text)){
        console.log(item,"checkitem")
        return item;
    }else{return null}
    
})

const filteredProducts= Products.filter(item=>{
    const molecule = item.Molecule_Name.toLowerCase();
    const product = item.title.toLowerCase();
    const TA = item.Therapeutic_Area.toLowerCase();
    
    console.log(molecule,product,TA,"filtered data")
    if (molecule.includes(text) ||  product.includes(text) || TA.includes(text)){
        console.log(item,"checkitem")
        return item;
    }else{return null}
    
})
       
        if(filteredProducts.length>0)
        activeTab=4;
        if(filteredEvent.length>0)
        activeTab=3;
        if(filteredPubmet.length>0)
        activeTab=2;
        if(filtered.length>0)
        activeTab=1;
        this.setState({
            activeKey:activeTab
        })
        this.setState({filtered , filteredPubmet,filteredEvent,filteredProducts})
    }
    }
    componentDidMount(){
        console.log('inside did mount')
    }
    componentWillReceiveProps(nextProps){
        let activeTab=1;
        const text = nextProps.keyword.toLowerCase();
        if (nextProps.keyword !== this.props.keyword){
        const filtered= Data.filter(item=>{
            const Heading = item.journalTitle.toLowerCase();
            const About = item.articleTitle.toLowerCase();
            if (Heading.includes(text) ||  About.includes(text)){
                return item;
            }else{return null}
        })
            const filteredPubmet= Pubmet.pubmedDataDetails.filter(item=>{
                const Heading = item.journalTitle.toLowerCase();
                const About = item.articleTitle.toLowerCase();
                if (Heading.includes(text) ||  About.includes(text)){
                    return item;
                }else{return null}
            
       })
                const filteredEvent= Event.filter(item=>{
                    const Heading = item.journalTitle.toLowerCase();
                    const About = item.articleTitle.toLowerCase();
                    if (Heading.includes(text) ||  About.includes(text)){
                        return item;
                    }else{return null}
                
       })
                const filteredProducts= Products.filter(item=>{
                    const molecule = item.Molecule_Name.toLowerCase();
                    const Product = item.title.toLowerCase();
                    const TA = item.Therapeutic_Area.toLowerCase();
                    if (molecule.includes(text) ||  Product.includes(text) ||  TA.includes(text)){
                        return item;
                    }else{return null}
        })
        if(filteredProducts.length>0)
        activeTab=4;
        if(filteredEvent.length>0)
        activeTab=3;
        if(filteredPubmet.length>0)
        activeTab=2;
        if(filtered.length>0)
        activeTab=1;
        this.setState({
            activeKey:activeTab
        })
        this.setState({filtered ,filteredPubmet,filteredEvent ,filteredProducts})
    }
    

        
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
      };
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }
      handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
        this.setState({ open: false });
      };
    render () {
        const {filtered , filteredPubmet,filteredEvent, filteredProducts, activeKey } = this.state;
        const {rowsPerPage, page } = this.state;
        const PageEndLimit = (this.state.page +1)* rowsPerPage;
        const pageStartLimit = PageEndLimit - rowsPerPage;
        let FilteredPage={};
        switch (activeKey) {
            case 1:
            FilteredPage = filtered.slice(pageStartLimit,PageEndLimit)
                break;
            case 2:
            FilteredPage = filteredPubmet.slice(pageStartLimit,PageEndLimit)   
                break;
            case 3:
            FilteredPage = filteredEvent.slice(pageStartLimit,PageEndLimit)   
                break;
            case 4:
            FilteredPage = filteredProducts.slice(pageStartLimit,PageEndLimit)   
                break;
            default:
            FilteredPage = filtered.slice(pageStartLimit,PageEndLimit)
                break;
        }
        const renderSelect = (
            <>
            <InputLabel className='selectLabelInput' htmlFor="sort">Sort By:</InputLabel>
            <Select
                    value={this.state.sort}
                    onChange={this.handleChange}
                    displayEmpty
                    name="sort"
                    className='selectInputBody'
                  >
                    <MenuItem className='selectInputBody'  value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem className='selectInputBody'  value={10}>Date</MenuItem>
                    <MenuItem className='selectInputBody'  value={20}>Relevance</MenuItem>
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                  </>
        )
        

       
        const length = filtered.length;
        const Pubmetlength = filteredPubmet.length;
        const Evenetlength = filteredEvent.length;
        const Prpductlength = filteredProducts.length;

        
        console.log(FilteredPage,PageEndLimit,pageStartLimit,"checking props inside seacrh")
        return (
            <div>
            <div>< BreadCrumbs PageName='Search Results' TabName='Home' TabValue ='0' /></div>
            <div className='resultWrapper'>
                 <div className='filterWrapper'>
                 
                 
                 <Filter />
                 
                 </div>
                 <div className='resulttabWrapper' style={{gridColumn:"2 / span 2"}}>
                     <div className= 'TabFilter'>
                                <ul>
                                    <li key='1' className={this.state.activeKey===1? 'active':null} onClick={()=>this.setState({activeKey:1})}><div>News<div className='badges'><Badge badgeContent={length} color="primary"  /></div></div> </li>
                                    <li key='2' className={this.state.activeKey===2? 'active':null} onClick={()=>this.setState({activeKey:2})}><div>Research<div className='badges research'><Badge badgeContent={Pubmetlength} color="primary"  /></div></div></li>
                                    <li key='3' className={this.state.activeKey===3? 'active':null} onClick={()=>this.setState({activeKey:3})}><div>Events<div className='badges events'><Badge badgeContent={Evenetlength} color="primary"  /></div></div></li>
                                    <li key='4' className={this.state.activeKey===4? 'active':null} onClick={()=>this.setState({activeKey:4})}><div>Brands<div className='badges events'><Badge badgeContent={Prpductlength} color="primary"  /></div></div></li>
                                </ul>
                                <div style={{paddingTop:'8px', marginTop:'19px'}}>{renderSelect}</div>
                                <div className="icons">
                                
                                <div>< FontAwesomeIcon icon={faFileExport} /> Export</div>
                                <div onClick={this.handleOpen}>< FontAwesomeIcon  icon={faSave} /> Save</div>
                               
                                
                                </div>
                                <SaveSearch keyword={this.props.keyword} handleClose={this.handleClose} open={this.state.open}/>
                     </div> 
                               
                           <div className="filteredCardWrapper"> 
                            {FilteredPage.length>0?
                                
                                FilteredPage.map(item=><Card  activeKey = {activeKey}{...item }{...this.props} />)
                                /* changes according to CI-88 */
                                :<NoRecordFoundMessage/>}

                          </div>
                 
                         {/* <div className='Pagination'>
                           <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={Filtered.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                                />
                         </div>   */}
                         <div  className='Pagination'>
                             <Table>
                         <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={activeKey===1?filtered.length:activeKey===2?filteredPubmet.length:activeKey===3?filteredEvent.length:filteredProducts.length}
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
                 </div>
                
                
            </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        isLoading: state.SavedSearchReducer.isLoading,
        keyword:state.SavedSearchesModalReducer.searchKeyword,
        values:state.SavedSearchesModalReducer.values,

    }

}
export default connect(mapStateToProps)(Search);