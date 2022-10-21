import React,{createContext} from "react"

export const Cart = createContext()
async function addCart(item){
    var rawdata = await fetch("/cart",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Cart is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function updateCart(item){
    var rawdata = await fetch("/cart/"+item.id,{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Cart is Update"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getCart(item){
    var rawdata = await fetch("/cart")
    var result = await rawdata.json()
    result = result.filter((x=>x.userid===item.userid))
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
async function getSingleCart(item){
    var rawdata = await fetch("/cart/"+item._id)
    var result = await rawdata.json()
    var {id,...x} = result
    if(result)
    return {result:"Done",data:{_id:id,...x}}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function deleteCart(item){
    var rawdata = await fetch("/cart/"+item._id,{
        method:"delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return {result:"Done",message:"Cart is Deleted"}
}
async function deleteAllCart(item){
    var rawdata = await fetch("/cart")
    var result = await rawdata.json()
    result = result.filter((i=>i.userid===item.userid))
    for(let item of result){
        rawdata = await fetch("/cart/"+item.id,{
            method:"delete"
        })
        result = await rawdata.json()
    }
    return {result:"Done",message:"All Cart are Deleted"}
}
export default function CartContextProvider(props){
    return <Cart.Provider value={
            {
                addCart:addCart,
                getCart:getCart,
                deleteData:deleteCart,
                getSingle:getSingleCart,
                update:updateCart,
                deleteAll:deleteAllCart
            }
        }>
        {props.children}
    </Cart.Provider>
}