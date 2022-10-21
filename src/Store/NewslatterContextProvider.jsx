import React,{createContext} from "react"

export const Newslatter = createContext()
async function addNewslatter(item){
    var rawdata = await fetch("/newslatter",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Newslatter is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getNewslatter(){
    var rawdata = await fetch("/newslatter")
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
async function deleteNewslatter(item){
    var rawdata = await fetch("/newslatter/"+item._id,{
        method:"delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return {result:"Done",message:"Newslatter is Deleted"}
}
export default function NewslatterContextProvider(props){
    return <Newslatter.Provider value={
            {
                add:addNewslatter,
                getNewslatter:getNewslatter,
                deleteData:deleteNewslatter
            }
        }>
        {props.children}
    </Newslatter.Provider>
}