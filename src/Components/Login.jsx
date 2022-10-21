import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import {User} from "../Store/UserContextProvider"
import pic from "../assets/images/login.jpg"
export default function Login() {
    var [user,setuser] = useState({
        username:"",
        password:""
    })
    var {getUser} = useContext(User) 
    var navigate = useNavigate()
    function getData(e){
        var name = e.target.name
        var value = e.target.value
        setuser((old)=>{
            return{
                ...old,
                [name]:value
            }
        })
    }
    async function postData(e){
        e.preventDefault()
        const response = await getUser()
        const authUser = response.data.find((item)=>item.username===user.username && item.password===user.password)
        if(authUser){
            localStorage.setItem("login",true)
            localStorage.setItem("username",authUser.username)
            localStorage.setItem("name",authUser.name)
            localStorage.setItem("userid",authUser._id)
            localStorage.setItem("role",authUser.role)
            if(authUser.role==="Admin")
            navigate("/admin-home")
            else
            navigate("/profile")
        }
        else
        alert("Invalid Username or Password!!!!")
    }
    return (
        <div className='container-fluid mt-2'>
            <div className='row'>
                <div className='col-md-6 col-12'>
                    <img src={pic} height="500px" width="100%" alt="" />
                </div>
                <div className='col-md-6 col-12'>
                    <h5 className='background text-light text-center p-2'>Login Section</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <input type="text" className="form-control" onChange={getData} name="username" placeholder='Enter User Name to Login to Your Account'/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={getData} name="password" placeholder='Enter Your Password'/>
                        </div>
                        <button type="submit" className=" background text-light mybtn w-100 p-1">Login</button>
                        <div className='d-flex justify-content-between mt-2'>
                            <Link to="#" className='text-decoration-none'>Forget Password</Link>
                            <Link to="/signup" className='text-decoration-none'>New User?Create a Free Account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
