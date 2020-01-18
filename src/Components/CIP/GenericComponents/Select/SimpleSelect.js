import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setCurrentTheuraputicArea, setCurrentView } from '../../../../Actions/ActionSearchFunction';

import { store } from "../../../../Store/Store";
import { CHILD_CONTEXT_TYPES } from 'react-dnd/lib/DragDropContext';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: '808294'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
let TAChanged = "Select"
class SimpleSelect extends React.Component {
  state = {
    age: '',
    name: '',
    labelWidth: 0
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    store.dispatch(setCurrentView(this.props.viewToSet, { "TAChanged": event.target.value }));
    TAChanged = event.target.value;
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.props.valueSelected}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
           
            {this.props.arrPassed.map((value, index) => (
              <MenuItem key={index} style={{ color: '#808294', fontSize: '14px', fontStyle: 'normal' }} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}


export default withStyles(styles)(SimpleSelect);
