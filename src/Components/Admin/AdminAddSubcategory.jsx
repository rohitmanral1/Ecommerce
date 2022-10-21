import React,{useState,useContext} from 'react'

import LeftNav from './LeftNav'

import { useNavigate } from 'react-router-dom'
import { Subcategory } from '../../Store/SubcategoryContextProvider'
export default function AdminAddSubcategory() {
    var [name,setname] = useState("")
    var {add,getSubcategory} = useContext(Subcategory)
    var navigate = useNavigate()
    function getData(e){
        setname(e.target.value)
    }
    async function postData(e){
        e.preventDefault()
        var result = await getSubcategory()
        var flag=false
        for(let i of result.data){
            if(i.name===name){
                flag=true
                break
            }
        }
        if(flag===false){
            var item = {
                name: name
            }
            const response = await add(item)
            if (response.result === "Done")
                navigate("/admin-subcategory")
            else
                alert(response.message)
        }
        else
        alert("Subcategory Already Exist")
    }
    return (
        <div className='container-fluid mt-2'>
            <div className='row'>
                <div className='col-lg-2 col-md-4 col-sm-6 col-12'>
                    <LeftNav />
                </div>
                <div className='col-lg-10 col-md-8 col-sm-6 col-12'>
                    <h5 className='background text-light text-center p-1'>Subcategory Section</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" onChange={getData} required placeholder='Enter Subcategory Name : '/>
                        </div>
                        <button type="submit" className="border-0 p-1 background text-light btn-sm w-100">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
