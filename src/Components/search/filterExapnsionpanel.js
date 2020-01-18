import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    // width: '54%',
    padding:'0px'
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const  SimpleExpansionPanel =(props)=> {

  const [expanded, setExpanded] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  // state={
  //   expanded: '',
  // }

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChange = panel => (event, expanded) => {
    // this.setState({
    //   expanded: expanded ? panel : false,
    // });
    setExpanded(expanded ? panel : false);
  };
 
  const { classes } =props;
  // const { expanded } = this.state;
  return (
    <div className={classes.root + ' expansionPanel'}>
      <ExpansionPanel
                square
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Source</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
         <List className={classes.root +' listWrapper'}>
      {['Cerner', 'First Databank', 'IQVIA', 'TATA Memorial','UHG','parent'].map(value => (
        <ListItem key={value} role={undefined} dense button onClick={ handleToggle(value)}>
          <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
          <ListItemText primary={value} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
                      square
                      expanded={expanded === 'panel2'}
                      onChange={handleChange('panel2')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Therapeutic Area</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
        <List className={classes.root +' listWrapper'}>
      {['Cardiovascular',
        'Endocrine and Metabolics',
        'Immunology',
        'Infectious Diseases',
        'Dermatology',
        'Gastroenterology',
        'Haematology',
        'Anti-infectives',
        'Oncology',
        'Ophthalmology',
        'Vaccine & Virology',
        'Rare Diseases',].map(value => (
        <ListItem key={value} role={undefined} dense button onClick={ handleToggle(value)}>
          <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
          <ListItemText primary={value} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
                      square
                      expanded={expanded === 'panel3'}
                      onChange={handleChange('panel3')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Indication</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
        <List className={classes.root +' listWrapper'}>
      {['Ankylosing Spondylitis',
        'CAD',
        'Dengue',
        'Fabry\'s',
        'HF',
        'HIV',
        'Hepatitis B',
        'Hepatitis C',
        'Hypertensive heart disease',
        'Lupus',
        'Nephropathy',
        'Tuberculosis'].map(value => (
        <ListItem key={value} role={undefined} dense button onClick={ handleToggle(value)}>
          <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
          <ListItemText primary={value} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
        </ExpansionPanelDetails>
      
      </ExpansionPanel>
      <ExpansionPanel
                      square
                      expanded={expanded === 'panel4'}
                      onChange={handleChange('panel4')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Active Substance</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
        <List className={classes.root +' listWrapper'}>
      {['Afinitor Disperz®/Votubia®',
       'Afinitor®/Votubia®',
        'Aimovig®',
        'Cibacen®',
         'Arzerra®'].map(value => (
        <ListItem key={value} role={undefined} dense button onClick={ handleToggle(value)}>
          <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
          <ListItemText primary={value} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* <ExpansionPanel
                      square
                      expanded={expanded === 'panel5'}
                      onChange={handleChange('panel5')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Information Object</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
        <List className={classes.root +' listWrapper'}>
      {[12, 13, 14, 15].map(value => (
        <ListItem key={value} role={undefined} dense button onClick={ handleToggle(value)}>
          <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
          <ListItemText primary={`IO ${value + 1}`} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
      <ExpansionPanel
                      square
                      expanded={expanded === 'panel6'}
                      onChange={handleChange('panel6')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Phase</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
        <List className={classes.root +' listWrapper'}>
      {['I', 'II', 'III', 'IV'].map(value => (
        <ListItem key={value} role={undefined} dense button onClick={ handleToggle(value)}>
          <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
          <ListItemText primary={value} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
                      square
                      expanded={expanded === 'panel7'}
                      onChange={handleChange('panel7')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Author</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
        <List className={classes.root +' listWrapper'}>
      {['Devesh Pathak', 'Tanuj Mittal', 'Anand Singh'].map(value => (
        <ListItem key={value} role={undefined} dense button onClick={ handleToggle(value)}>
          <Checkbox color="primary" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple />
          <ListItemText primary={value} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </div>
  );

}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);