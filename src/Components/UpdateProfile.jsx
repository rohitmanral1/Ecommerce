import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import pic from "../assets/images/noimage.png"
import { User } from "../Store/UserContextProvider"
export default function UpdateProfile() {
    var [user, setuser] = useState({})
    var { getSingle, update } = useContext(User)
    var navigate = useNavigate()
    async function getAPIData() {
        var item = {
            _id: localStorage.getItem("userid")
        }
        const response = await getSingle(item)
        setuser(response.data)
    }
    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setuser((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getFile(e) {
        var name = e.target.name
        var value = e.target.files[0].name
        setuser((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var item = {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password,
            addressline1: user.addressline1,
            addressline2: user.addressline2,
            addressline3: user.addressline3,
            pin: user.pin,
            city: user.city,
            state: user.state,
            pic: user.pic,
            role: user.role
        }
        const response = await update(item)
        if (response.result === "Done")
            navigate("/profile")
        else
            alert(response.message)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid mt-2'>
            <div className='row'>
                <div className='col-md-6 col-12'>
                    {user.pic ?
                        <img src={require(`../assets/productimages/${user.pic}`)} height="500px" width="500px" /> :
                        <img src={pic} height="500px" width="500px" />
                    }
                </div>
                <div className='col-md-6 col-12'>
                    <h5 className='background text-light text-center p-1'>Update Profile Section</h5>
                    <form onSubmit={postData}>
                        <div className='row mb-3'>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" onChange={getData} name="name" placeholder='Enter User Full Name' value={user.name} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Profile Picture</label>
                                <input type="file" className="form-control" onChange={getFile} name="pic" />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Email Id</label>
                                <input type="email" className="form-control" onChange={getData} name="email" placeholder='Enter Email Address' value={user.email} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" onChange={getData} name="phone" placeholder='Enter Phone Number' value={user.phone} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Address Line 1</label>
                                <input type="text" className="form-control" onChange={getData} name="addressline1" placeholder='Enter House number or Building Number' value={user.addressline1} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Address Line 2</label>
                                <input type="text" className="form-control" onChange={getData} name="addressline2" placeholder='Enter Street Number or Near By' value={user.addressline2} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-md-6 col-12">
                                <label className="form-label">Address Line 3</label>
                                <input type="text" className="form-control" onChange={getData} name="addressline3" placeholder='Enter Village or Locality' value={user.addressline3} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">PIN</label>
                                <input type="text" className="form-control" onChange={getData} name="pin" placeholder='Enter PIN CODE' value={user.pin} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="col-md-6 col-12">
                                <label className="form-label">City</label>
                                <input type="text" className="form-control" onChange={getData} name="city" placeholder='Enter City Name' value={user.city} />
                            </div>
                            <div className="col-md-6 col-12">
                                <label className="form-label">State</label>
                                <input type="text" className="form-control" onChange={getData} name="state" placeholder='Enter State Name' value={user.state} />
                            </div>
                        </div>
                        <button type="submit" className="background mybtn text-light  w-100 btn-sm p-1">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
