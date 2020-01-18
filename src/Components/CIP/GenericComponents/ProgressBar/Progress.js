import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
   
  },
  
  linearBarColorPrimary: {
    backgroundColor: '#CB6318',
  }
};

class CustomizedProgressBars extends React.Component {
  state = {
    completed: 0,
  };

  // componentDidMount() {
  //   this.timer = setInterval(this.progress, 500);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  progress = () => {
    const { completed } = 40;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={(this.props.length/this.props.Maxlength)*100} classes={{
          
          barColorPrimary: classes.linearBarColorPrimary,
        }}  />
      </div>
    );
  }
}

CustomizedProgressBars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedProgressBars);