import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '../CIP/GenericComponents/Table/table';
import AdvanceSearch from '../search/advanceSearch';




const Styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    root: {
      // marginTop:'0',
        // width: '54%',
        padding:'0px',
        // maxHeight:'200px',
        display:'flex',
        flexWrap:'wrap'
        
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        borderRight: '5px solid grey',
        paddingRight: '20px'
      },
      text:{
        padding:'0'
      }
  });

class Alert extends Component {
           

    state={
        checked:[]
    }


    


    
    render () {
        const { classes } =this.props;
        const checked = this.state.checked;

        const handleToggle = value => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];
        
            if (currentIndex === -1) {
              newChecked.push(value);
            } else {
              newChecked.splice(currentIndex, 1);
            }
        
            this.setState({checked:newChecked});
          };

        return (

            <div >
            <div>
                       <div className='masterWrapper'> 
                          <div>
                            <AdvanceSearch screen='prefenrences'/>
                          </div>
                       </div>                 
            </div>         
                            <div className='tableWrapperAlert' >
                              < Table handleToggle={this.handleToggle}/>
                            </div>
            </div>
        )
    }
}

export default withStyles(Styles)(Alert);