import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';

const CustomTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: '#AAABB8',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, keyword, source, time, active) {
  id += 1;
  return { id, name, keyword, source, time, active };
}

const rows = [
  createData('Alert 1', 'Cancer', ['Source 4','Source 8','Source 9'], 24, 0),
  createData('Alert 2', 'Oncology', ['Source 2','Source 3','Source 7'], 37, 1),
  createData('Alert 3', 'Diabetes', ['Source 1','Source 4','Source 8'], 24, 0),
  createData('Alert 4', 'TB', ['Source 1','Source 2','Source 4'], 67, 1),
];
// rows.push(createData('bread', 356, 16.0, 49, 3.9))

class  CustomizedTable extends Component {
  state={
       rows

  }

  componentWillReceiveProps(nextProps){
      if(nextProps.keyword!== this.props.keyword){
        console.log(nextProps.keyword)
        const Rows = this.state.rows;
        const keyword = nextProps.keyword;

        const NewRow={};
        
        NewRow.id =JSON.stringify(new Date());
        NewRow.name = keyword.AlertName;
        NewRow.source = keyword.checked;
        NewRow.keyword = keyword.Tags;
        NewRow.time = 36;
        NewRow.active = 1;
        console.log(NewRow, 'checking new Row')

        const NewRows = [...Rows,NewRow];
        this.setState({rows:NewRows})
        

      }

  }

  render() {
  const { classes } = this.props;
  const Rows = this.state.rows;
  console.log(rows, 'data inside')
  

  const handleSwitch =(row)=>{
        const Index = Rows.indexOf(row);
        console.log(Rows[Index])
        Rows[Index].active=!Rows[Index].active;
        // rows.slice(Index,1)\
        this.setState({rows:Rows})
        console.log(rows)
        // CustomizedTable(props);
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table +' tablewrappertable'}>
        <TableHead className='alertTableHead'>
          <TableRow>
            <CustomTableCell style={{paddingLeft:'10px'}}>Alert Name</CustomTableCell>
            <CustomTableCell align="right">Search Keyword</CustomTableCell>
            <CustomTableCell align="right">Source</CustomTableCell>
            <CustomTableCell align="right">Time Stamp</CustomTableCell>
            <CustomTableCell align="right">Active</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell style={{paddingLeft:'10px'}} component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.keyword}</CustomTableCell>
              <CustomTableCell align="right">{row.source.toString()}</CustomTableCell>
              <CustomTableCell align="right">{row.time}</CustomTableCell>
              <CustomTableCell align="right">
                                      <Switch
                                        checked={row.active}
                                        onChange={()=>handleSwitch(row)}
                                        value={row.id}
                                        color="primary"
                                      />
                            {/* {row.active} */}
                            </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
}
CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    keyword:state.SavedSearchesModalReducer.searchKeyword,
  }
}
export default connect(mapStateToProps)(withStyles(styles)(CustomizedTable));