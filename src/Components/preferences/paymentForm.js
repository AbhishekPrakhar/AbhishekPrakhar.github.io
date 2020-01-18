import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MultiSelect from '../CIP/GenericComponents/MultiSelect/multiselect';


const styles =theme => ( {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      minWidth: 400,
      maxWidth: 300,
    },
    chips: {
        
      display: 'flex',
      flexWrap: 'wrap',
      minWidth:"30px"
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    noLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    select:{
        minWidth:"30vw",
        maxWidth:'30vw'
    }
  });

  const names = [
    'Aclasta/Reclast',
    'Adelphane-Esidrex ',
    'Amturnide',
    'Anafranil',
    'Brinaldix',
    'Comtan',
    'Cosentyx',
    'Diovan',
  ];
  const Theraupeutic = [
    'Cardiovascular',
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
    'Rare Diseases',

  ];
  const substance = [
    'Ergotamine',
    'Ergot',
    'Imatinib',
    'Saccharin',
  ];



class PaymentForm extends React.Component {

    state = {
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
        product: [],
        TheraupeuticArea:[],
        substance:[],
      };
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

      handleMultiChange = event => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
      };
      handleChangeMultiple = event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({
          name: value,
        });
      };
  
  render(){
    return (
    <React.Fragment>
      <Grid container className='PreferencesForm' spacing={24}>
        <Grid item xs={12} md={12} className='GridMultiSelect'>
        <MultiSelect Options={Theraupeutic} Value={['Cardiovascular']} label='Theraupeutic Area'/>
        <MultiSelect Options={names} Value={['Anafranil']} label='Brand'/>
        <MultiSelect Options={substance} Value={['Ergotamine']} label='Competitors'/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}}
PaymentForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PaymentForm);