import React,{createContext} from "react"

export const Maincategory = createContext()
async function addMaincategory(item){
    var rawdata = await fetch("/maincategory",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Maincategory is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function updateMaincategory(item){
    var rawdata = await fetch("/maincategory/"+item._id,{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Maincategory is Update"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getMaincategory(item){
    var rawdata = await fetch("/maincategory")
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
async function getSingleMaincategory(item){
    var rawdata = await fetch("/maincategory/"+item._id)
    var result = await rawdata.json()
    var {id,...x} = result
    if(result)
    return {result:"Done",data:{_id:id,...x}}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function deleteMaincategory(item){
    var rawdata = await fetch("/maincategory/"+item._id,{
        method:"delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return {result:"Done",message:"Maincategory is Deleted"}
}
export default function MaincategoryContextProvider(props){
    return <Maincategory.Provider value={
            {
                add:addMaincategory,
                getMaincategory:getMaincategory,
                deleteData:deleteMaincategory,
                getSingle:getSingleMaincategory,
                update:updateMaincategory
            }
        }>
        {props.children}
    </Maincategory.Provider>
}