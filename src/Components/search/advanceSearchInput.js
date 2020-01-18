import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});



class TextFields extends React.Component {
  state = {
    Author: '',
    Title: '',
    Tag: '',
    
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log('handle triggred',this.props, event.target.value)
    this.props.handleInput();
  };

  render() {
    const { classes } = this.props;
    const Name=this.props.name;

    return (
      <form className={classes.container} onSubmit={(e)=>e.preventDefault()} noValidate autoComplete="off">

        <TextField
          // value={this.state.Name}
          onChange={(e)=>this.props.handleInput(Name,e)}
          // onBlur={(e)=>this.props.handleInput(Name,e)}
          id="standard-bare"
          className={classes.textField}
          defaultValue={this.props.name}
          margin="normal"
        />
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);