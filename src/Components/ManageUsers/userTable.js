
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/PersonAdd';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import AddUser from './addUser';
import './user.css';

let counter = 0;
function createData(firstName, lastName, email, type) {
  counter += 1;
  return { id: counter, firstName, lastName, email, type };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'group', numeric: false, disablePadding: true, label: 'User Group' },
  { id: 'role', numeric: false, disablePadding: true, label: 'Role' },

];

class EnhancedTableHead extends React.Component {


  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };




  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, selectedRow, selected } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Users List
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={() => props.handleDelete(selected)} />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Add User">
              <IconButton aria-label="Filter list" className='addUser' onClick={props.handleOpen}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        {props.open &&
          <AddUser selectedRow={selectedRow} handleSave={props.handleSave} handleClose={props.handleClose} open={props.open} data={props.data} />
        }

      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
  },
  table: {
    // minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    open: false,
    order: 'asc',
    orderBy: 'role',
    selected: [],
    selectedRow: null,
    data: localStorage.getItem('dataList') != null ? JSON.parse(localStorage.getItem('dataList')) : [
      { id: new Date().getMilliseconds() + new Date().getTime() + 1, firstName: 'Devesh', lastName: 'Pathak', email: 'dk.pathak@tcs.com', group: 'Oncology', role: 'Consumer' },
      { id: new Date().getMilliseconds() + new Date().getTime() + 2, firstName: 'Anand', lastName: 'Singh', email: 'Anand.singh@tcs.com', group: 'Gastroenterology', role: 'Administrator' },
      { id: new Date().getMilliseconds() + new Date().getTime() + 3, firstName: 'Deepti', lastName: 'Dhyani', email: 'deepti.dhyani@tcs.com', group: 'Dermatology', role: 'Analyst' },
      // createData('Devesh', 'Pathak','dk.pathak@tcs.com', 'User'),
      // createData('Anand', 'Singh','Anand.singh@tcs.com', 'Admin'),
      // createData('Deepti', 'Dhyani','deepti.dhyani@tcs.com', 'Admin'),

    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleOpen = (e, n) => {

    if (n === undefined) {
      this.setState({ open: true });
    } else if (n !== undefined) {
      this.setState({
        open: true,
        selectedRow: n
      })
    }


  };

  handleClose = () => {
    this.setState({
      open: false,
      selectedRow: null
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleSave = (props) => {
    const data = this.state.data;
    let index = -1;
    data.map(item => {
      if (item.id === props.id) {
        return index = data.indexOf(item);
      } else { return null }
    })
    if (index === -1) {
      props.id = new Date().getMilliseconds() + new Date().getTime();
      data.unshift(props)
    } else {
      data[index] = props;
    }
    // for storing data in local storage
    console.log('dataList', JSON.stringify(data));
    localStorage.setItem('dataList', JSON.stringify(data));
    var getList = JSON.parse(localStorage.getItem('dataList'));
    this.setState({ data })
    this.handleClose();
  }

  handleDelete = (Selected) => {

    var data = this.state.data;
    var selectedData = Selected;
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < selectedData.length; j++) {
        if (data[i].id === selectedData[j]) {
          data.splice(i, 1);
        };
      };
    };
    localStorage.setItem('dataList', JSON.stringify(data));
    this.setState({ data, selected: [] })

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, selectedRow } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} selectedRow={selectedRow} data={data} handleSave={this.handleSave} handleClose={this.handleClose} handleOpen={this.handleOpen} handleDelete={this.handleDelete} open={this.state.open} selected={selected} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover

                      type="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell
                        onClick={event => this.handleClick(event, n.id)}
                        padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell className='firstNameTable'
                        onClick={e => this.handleOpen(e, n)}
                        component="th" scope="row" padding="none">
                        {n.firstName}

                      </TableCell>
                      <TableCell padding="none" >{n.lastName}</TableCell>
                      <TableCell padding="none">{n.email}</TableCell>
                      <TableCell padding="none">{n.group}</TableCell>
                      <TableCell padding="none">{n.role}</TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);