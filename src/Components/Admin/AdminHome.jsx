import React from 'react'

import pic from "../../assets/images/user.jpg"
import LeftNav from './LeftNav'
export default function AdminHome() {
    return (
        <div className='container-fluid mt-2'>
            <div className='row'>
                <div className='col-lg-2 col-md-4 col-sm-6 col-12'>
                    <LeftNav/>
                </div>
                <div className='col-lg-10 col-md-8 col-sm-6 col-12'>
                    <div className='row'>
                        <div className='col-md-6 col-12'>
                            <img src={pic} width="100%" height="500px" alt=''/>
                        </div>
                        <div className='col-md-6 col-12'>
                            <h5 className='background text-light text-center p-1'>Admin Home Page</h5>
                            <table className='table table-striped table-hover'>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>Rohit Manral</td>
                                    </tr>
                                    <tr>
                                        <th>User Name</th>
                                        <td>admin</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                        <td>Admin</td>
                                    </tr>
                                    <tr>
                                        <th>Email ID</th>
                                        <td>admin@ecom.com</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>8506980096</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
