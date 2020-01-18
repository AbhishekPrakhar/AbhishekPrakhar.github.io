import React from 'react';
import EditShareDeleteButton from '../GenericComponents/Button/EditShareDeleteButton';
import RadioButtons from '../GenericComponents/RadioButton/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import './SavedSearchTable.css';
import Grid from '@material-ui/core/Grid';

const SavedSearchTable = (props) => {
    return (
        <div>
            <Grid item xs={12}>
                <Table>
                    <TableBody className="tableBodyWrapper">
                        <TableRow>
                            <TableCell className="text">{props.text}<div className="detail">{props.day} days ago</div></TableCell>
                            <TableCell className="securitychoice"><RadioButtons security={props.privatePublicField} /></TableCell>
                            <TableCell> <EditShareDeleteButton /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </div>
    );
}
export default SavedSearchTable;