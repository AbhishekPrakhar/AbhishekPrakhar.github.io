import React, { Component } from 'react';
import { connect } from 'react-redux';
import './search.css';
// import Demo_Grid from './demoGrid';

// import Demo_List from './demoList';
// import DemoAdvancedSearch from './DemoAdvancedSearch';
import RangeSlider from './RangeSlider';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from './filterExapnsionpanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import  { faFilter } from '@fortawesome/free-solid-svg-icons'


var dataSource=[];
var rowindex = 1;

class ParentDemo extends Component {
    constructor(props) {
         super(props);
         const { dispatch } = this.props;    
         this.state = {
            key: 1,
            advancedSearchRows: [1],
            selectedEndIndex:"",
            selectedStartIndex:"",
            selectedMinActivity:"",
            selectedMaxActivity:"",
            currency: 'EUR',
         }
         this.handleSelect = this.handleSelect.bind(this);
         this.handleIndex = this.handleIndex.bind(this); 
         this.handleActivity = this.handleActivity.bind(this);
     }

   
     handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

     handleSelect(key) {
        this.setState({ key: key });
    }

    addSearchRow(){
        rowindex++;
        this.state.advancedSearchRows.push(rowindex);
        this.setState({advancedSearchRows: this.state.advancedSearchRows});
    }

    deleteSearchRow(id){
        var index = -1;   
        var i;
        for(i=0;i<this.state.advancedSearchRows.length;i++){
            if(id==this.state.advancedSearchRows[i]){
                index = i;
                break;
            }
        }
        this.state.advancedSearchRows.splice(index,1);
        this.setState({advancedSearchRows: this.state.advancedSearchRows}); 
    }

    handleIndex(start, end) {
        this.setState({
          selectedStartIndex: start,
          selectedEndIndex: end,
        });
      }

      handleActivity(start,end){
        this.setState({
            selectedMinActivity: start,
            selectedMaxActivity: end,
          });
      }

     _renderSubComp() {
        dataSource = [{
            key: '1',
            fullname: 'Full Name',
            speciality: 'Speciality',
            institution: 'Institution',
            city:'City',
            country:'Country',
            influencerindex:'Integrated Key Influencer Index',
            totalnominations:'Total Nominations',
            totalregionalnominations:'Total Regional Nominations'
            
          }, 
          {
            key: '2',
            fullname: 'Full Name',
            speciality: 'Speciality',
            institution: 'Institution',
            city:'City',
            country:'Country',
            influencerindex:'Integrated Key Influencer Index',
            totalnominations:'Total Nominations',
            totalregionalnominations:'Total Regional Nominations'
          },
          {
            key: '3',
            fullname: 'Full Name',
            speciality: 'Speciality',
            institution: 'Institution',
            city:'City',
            country:'Country',
            influencerindex:'Integrated Key Influencer Index',
            totalnominations:'Total Nominations',
            totalregionalnominations:'Total Regional Nominations'
          },
          {
            key: '4',
            fullname: 'Full Name',
            speciality: 'Speciality',
            institution: 'Institution',
            city:'City',
            country:'Country',
            influencerindex:'Integrated Key Influencer Index',
            totalnominations:'Total Nominations',
            totalregionalnominations:'Total Regional Nominations'
          },
          {
            key: '5',
            fullname: 'Full Name',
            speciality: 'Speciality',
            institution: 'Institution',
            city:'City',
            country:'Country',
            influencerindex:'Integrated Key Influencer Index',
            totalnominations:'Total Nominations',
            totalregionalnominations:'Total Regional Nominations'
          },
          {
            key: '6',
            fullname: 'Full Name',
            speciality: 'Speciality',
            institution: 'Institution',
            city:'City',
            country:'Country',
            influencerindex:'Integrated Key Influencer Index',
            totalnominations:'Total Nominations',
            totalregionalnominations:'Total Regional Nominations'
          },
          {
            key: '7',
            fullname: 'Full Name',
            speciality: 'Speciality',
            institution: 'Institution',
            city:'City',
            country:'Country',
            influencerindex:'Integrated Key Influencer Index',
            totalnominations:'Total Nominations',
            totalregionalnominations:'Total Regional Nominations'
          }];
            //  switch (this.state.key) {
            //      case 1: {
            //          return <Demo_Grid DemoArray={dataSource}/>
 
            //      }
            //      case 2: {
            //          return <Demo_List CardItems={dataSource}/>
            //      }
 
            //  }
         }
     

     render() {

    //     let dashboard = '';
    // if (this.props.Pageurl === 'CardDetails') {
    //   dashboard = < KOICardDetails />
    // }
        // styles = 'light-theme-KOI';
        return (
           
                //  <div className={"background_appear " + styles}>
                // <div className="container-fluid stylingKOI">
                //     <div className="row KOIHeading">
                //         <p className="headingcontent">key Opinion Leader Filters</p>
              


                        <div className="" style={{margin:'10px 10px',border: '1px solid #9fadc8',
                                                  backgroundColor: '#f2f8ff'}}>
                        <div className="">
                        <div className="refine_search1 ">
                                    {/* <span className="glyphicon glyphicon-filter refine_search filter_KOI_icon"></span> */}
                                    <h3 className="refine_KOI">< FontAwesomeIcon style={{color:'#fff', marginRight:'10px'}} icon={faFilter} /> Refine results by :</h3>
                                </div>
                            <div className="">
                                < ExpansionPanel />
                                
                
                                <div className='filter_pos'>
                                    {/* <div className='headingWraper'> */}
                                    {/* <p className="headingbold">Range Slider 1</p> */}
                                    {/* <Results applyClicked={this.getUserdefinedDate}/> */}

                                    {/* <div className="panel-filter">
                                       <RangeSlider min={0} max={20} defaultValue={0} onChange={this.handleIndex}  />
                                    </div> */}
                                  {/* </div> */}
                                   {/* <div className='headingWraper'>
                                    <p className="patientRangeoptions">Range Slider 2</p>  */}
                                    {/* <Results applyClicked={this.getUserdefinedDate}/> */}

                                    {/* <div className="panel-filter">
                                       <RangeSlider min={1} max={10} defaultValue={1} onChange={this.handleActivity}/>
                                    </div> */}
                                    {/* </div> */}
                                    {/* <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Currency"
                                            className="selectFilter"
                                            value={this.state.currency}     
                                            onChange={this.handleChange('currency')}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: "SelectMenu",
                                                    },
                                                }}
                                                helperText="Please select currency"
                                                margin="normal"
                                                variant="outlined"
                                                                        >
                                                    {currencies.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                    </MenuItem>
                                                ))}
                                </TextField> */}

                                    
                                    <div className='applyReset'>
                                        <button type="button" className="">Apply</button>  
                                        <button type="button" className="">Reset</button></div>
                                </div>

                                


                                {/* </div>
                                </div> */}


                        {/* <div className="row data_format"> */}
                        {/* <div className="col-sm-9 col-md-9 ">
                            {this._renderSubComp()}
                        </div> */}
                 </div>
                 {/* </div> */}
                 </div>
                 </div>
                //  </div>
                //  </div>
                //  </div>
        )
    }
}

// function mapStateToProps(state) {
//     //  console.log("rweurl",  state.DisplayPageURLReducer.Pageurl)
//     return {
//       Pageurl: state.DisplayPageURLReducer.Pageurl,
//     //   isLight: state.ThemeReducer.isLight
//     };
//   }
export default connect(null, null)(ParentDemo);