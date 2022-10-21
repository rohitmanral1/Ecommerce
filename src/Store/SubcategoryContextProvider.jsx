import React,{createContext} from "react"

export const Subcategory = createContext()
async function addSubcategory(item){
    var rawdata = await fetch("/subcategory",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Subcategory is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function updateSubcategory(item){
    var rawdata = await fetch("/subcategory/"+item._id,{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Subcategory is Update"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getSubcategory(item){
    var rawdata = await fetch("/subcategory")
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
async function getSingleSubcategory(item){
    var rawdata = await fetch("/subcategory/"+item._id)
    var result = await rawdata.json()
    var {id,...x} = result
    if(result)
    return {result:"Done",data:{_id:id,...x}}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function deleteSubcategory(item){
    var rawdata = await fetch("/subcategory/"+item._id,{
        method:"delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return {result:"Done",message:"Subcategory is Deleted"}
}
export default function SubcategoryContextProvider(props){
    return <Subcategory.Provider value={
            {
                add:addSubcategory,
                getSubcategory:getSubcategory,
                deleteData:deleteSubcategory,
                getSingle:getSingleSubcategory,
                update:updateSubcategory
            }
        }>
        {props.children}
    </Subcategory.Provider>
}