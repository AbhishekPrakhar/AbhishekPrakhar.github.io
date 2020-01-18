import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import {PreferenceOpted} from '../../Actions/ActionSearchFunction';
import { connect } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const products = [
  { name: 'My Searches', desc: 'Saved Search', checked: 'A' },
  { name: 'Bookmarks', desc: '', checked: 'B' },
  { name: 'Alert', desc: '', checked: 'C' },
  { name: 'Worklists', desc: '', checked: 'D' },
  { name: 'Standard Reports', desc: '', checked: 'E' },
  { name: 'Shared Reports', desc: '', checked: 'F' },
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Review extends React.Component {
    state=this.props.Opted;
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.dispatch(PreferenceOpted({...this.state , [name]:event.target.checked}))


      };
  
  render(){
    const { classes } = this.props;
    console.log(this.state,"whats state now")
  
  return (
    <React.Fragment>
      <List className='ReviewForm' disablePadding>
        {products.map(product => {
           let something=product.checked;
           return (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <FormControlLabel
          control={
            <Switch
              checked={something==="A"? this.state.checkedA:something==="B"?this.state.checkedB
                       :something==="C"? this.state.checkedC:something==="D"?this.state.checkedD
                       :something==="E"?this.state.checkedE:this.state.checkedF}
              onChange={this.handleChange(`checked${something}`)}
              value={`checked${something}`}
              color="primary"
            />
          }
        />
          </ListItem>
        )})}
      </List>
    </React.Fragment>
  );
}}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    Opted: state.PreferenceOptedReducer }
}

export default connect(mapStateToProps)(withStyles(styles)(Review));