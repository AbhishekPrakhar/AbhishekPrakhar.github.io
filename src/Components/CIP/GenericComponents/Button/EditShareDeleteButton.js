import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider ,createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  fab: {
    // margin: theme.spacing.unit,
   backgroundColor: "#CB6318"
   
  },
  fabGreen: {
    margin: theme.spacing.unit/2,
    color: theme.palette.common.white,
    backgroundColor: "#CB6318",
    '&:hover': {
      backgroundColor: "#cb6318cc",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
 
});





function EditShareDeleteButton(props) { 
  const { classes } = props;
  return (
    <div>
      
      <Fab color="primary" aria-label="Edit" className={classes.fabGreen}  size="small">
      <Icon>edit_button</Icon>
      </Fab>
    
      <Fab color="secondary" aria-label="Edit" className={classes.fabGreen}  size="small">
      <Icon>share_button</Icon>
      </Fab>
     
      <Fab  aria-label="Delete" className={classes.fabGreen} size="small">
        <DeleteIcon />
      </Fab>
     
    </div>
  );
}

EditShareDeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditShareDeleteButton);