import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './addressForm';
import PaymentForm from './paymentForm';
import Review from './Review';
import '../../Styles/GeneralStyles.css';
import BreadCrumbs from '../CIP/GenericComponents/BreadCrumbs/breadCrumbs';

const styles = theme => ({
  appBar: {
    position: 'relative',
    fontSize:theme.spacing.unit*3
  },
  layout: {
    paddingTop:'0px !important',
    marginTop:'0px !important',
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display:'flex',
    flexWrap:'wrap',
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {

      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  step:{
    minHeight:100,
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'flex-end',
  },
  button: {    
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    textTransform: 'none',
  },
});

const steps = ['Profile', 'Interest', 'Content'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    // case 3:
    //   return <Alert />;
    default:
      throw new Error('Unknown step');
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        {/* <CssBaseline /> */}
        {/* <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Company name
            </Typography>
          </Toolbar>
        </AppBar> */}
        <main className={classes.layout}>
        <div>< BreadCrumbs PageName='Preferences'  TabName='Home' TabValue ='0'/></div>
          <Paper className={classes.paper}>
            {/* <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography> */}
            <Stepper activeStep={activeStep} className={classes.stepper+" Step"}
                     orientation="vertical">
              {steps.map(label => (
                <Step key={label} >
                  <StepLabel >{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" style={{marginLeft:'35px'}} gutterBottom>
                    Thank you ! Your Preferences are saved.
                  </Typography>
                  {/* <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography> */}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}
                      
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button +' preferencesButton'}
                      
                    >
                      {activeStep === steps.length - 1 ? 'Save Changes' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);