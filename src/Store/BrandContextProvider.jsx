import React,{createContext} from "react"

export const Brand = createContext()
async function addBrand(item){
    var rawdata = await fetch("/brand",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Brand is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function updateBrand(item){
    var rawdata = await fetch("/brand/"+item._id,{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Brand is Update"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getBrand(){
    var rawdata = await fetch("/brand")
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
async function getSingleBrand(item){
    var rawdata = await fetch("/brand/"+item._id)
    var result = await rawdata.json()
    var {id,...x} = result
    if(result)
    return {result:"Done",data:{_id:id,...x}}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function deleteBrand(item){
    var rawdata = await fetch("/brand/"+item._id,{
        method:"delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return {result:"Done",message:"Brand is Deleted"}
}
export default function BrandContextProvider(props){
    return <Brand.Provider value={
            {
                add:addBrand,
                getBrand:getBrand,
                deleteData:deleteBrand,
                getSingle:getSingleBrand,
                update:updateBrand
            }
        }>
        {props.children}
    </Brand.Provider>
}