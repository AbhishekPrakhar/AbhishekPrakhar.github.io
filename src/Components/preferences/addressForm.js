import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '../widgets/select';

function AddressForm() {

  const [firstName, setfirstname] = React.useState(['Tanuj']);
  const [lastName, setlastName] = React.useState(['Mittal']);
  const [email, setemail] = React.useState(['tm@tcs.com']);
  const [number, setnumber] = React.useState([+919874563289]);
  const [location, setlocation] = React.useState(['Basel']);
  const [country, setcountry] = React.useState(['Switzerland']);

  const handleChange = (event)=>{
      const { name , value } = event.target;
      switch (name) {
        case 'firstName':
          setfirstname(value)
          break;
          case 'lastName':
          setlastName(value)
          break;
          case 'email':
          setemail(value)
          break;
          case 'number':
          setnumber(value)
          break;
          case 'location':
          setlocation(value)
          break;
          case 'country':
          setcountry(value)
          break;
      
        default:
          break;
      }

  }
  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      <Grid container className='PreferencesForm' spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={firstName}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
           <Select />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Email"
            fullWidth
            autoComplete="xyz@gmail.com"
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={email}
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           value={number}
           type="number"
           id="phone" 
           name="number"
           label="Phone" 
           fullWidth
           onChange={handleChange}
           />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={location}
            id="location"
            name="location"
            label="Location"
            fullWidth
            autoComplete="antartica"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={country}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveAddress" value="yes" />}
            label="Make profile Public"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;