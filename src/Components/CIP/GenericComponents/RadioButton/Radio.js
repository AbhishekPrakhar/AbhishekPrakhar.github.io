import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};


class RadioButtons extends React.Component {
  
  state = {
    value:this.props.security
  };
  

  render() {
    const { classes } = this.props;

    return (
      <FormControl component="fieldset">
        <RadioGroup
          name="position"
          value={this.state.value}
          row
        >
          <FormControlLabel className = "margins"
          value = "public"
          checked={this.state.value}
          control={<Radio style = {{width : 10 , height: 10 }}  classes={{
            root: classes.root,
            checked: classes.checked,
          }}
               />}
            label="Public"
            labelPlacement="end"
            marginRight="10"
          />
          <FormControlLabel
            value="private"
            control={<Radio style = {{width : 10 , height: 10 }}  classes={{
              root: classes.root,
              checked: classes.checked,
            }} />}
            label="Private"
            labelPlacement="end"
          />
         
          
        </RadioGroup>
      </FormControl>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);
