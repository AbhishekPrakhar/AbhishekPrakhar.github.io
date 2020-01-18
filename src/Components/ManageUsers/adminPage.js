import React, { Component } from 'react'
import UserTable from './userTable';
import BreadCrumbs from '../CIP/GenericComponents/BreadCrumbs/breadCrumbs';

class AdminPage extends Component {
    render () {
        return (
            <div>
                <BreadCrumbs PageName='Manage Users' TabName='Home' TabValue ='0'/>
              < UserTable/>
            </div>
        )
    }
}

export default AdminPage