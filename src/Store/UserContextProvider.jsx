import React,{createContext} from "react"

export const User = createContext()
async function addUser(item){
    var rawdata = await fetch("/user",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"User is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function updateUser(item){
    var rawdata = await fetch("/user/"+item._id,{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"User is Update"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getUser(){
    var rawdata = await fetch("/user")
    var result = await rawdata.json()
    var d = []
    for(let item of result){
        var {id,...x} = item
        d.push({_id:id,...x})

    }
    if(result)
    return {result:"Done",data:d}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getSingleUser(item){
    var rawdata = await fetch("/user/"+item._id)
    var result = await rawdata.json()
    var {id,...x} = result
    if(result)
    return {result:"Done",data:{_id:id,...x}}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function deleteUser(item){
    var rawdata = await fetch("/user/"+item._id,{
        method:"delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return {result:"Done",message:"User is Deleted"}
}
export default function UserContextProvider(props){
    return <User.Provider value={
            {
                add:addUser,
                getUser:getUser,
                deleteData:deleteUser,
                getSingle:getSingleUser,
                update:updateUser
            }
        }>
        {props.children}
    </User.Provider>
}