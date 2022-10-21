import React,{createContext} from "react"

export const Checkout = createContext()
async function addCheckout(item){
    var rawdata = await fetch("/checkout",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Checkout is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function updateCheckout(item){
    var rawdata = await fetch("/checkout/"+item._id,{
        method:"put",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Checkout is Update"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getCheckout(){
    var rawdata = await fetch("/checkout")
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
async function getCheckoutUser(item){
    var rawdata = await fetch("/checkout")
    var result = await rawdata.json()
    result = result.filter((i)=>i.userid===item.userid)
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
async function getSingleCheckout(item){
    var rawdata = await fetch("/checkout/"+item._id)
    var result = await rawdata.json()
    var {id,...x} = result
    if(result)
    return {result:"Done",data:{_id:id,...x}}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
export default function CheckoutContextProvider(props){
    return <Checkout.Provider value={
            {
                add:addCheckout,
                getCheckout:getCheckout,
                getSingle:getSingleCheckout,
                update:updateCheckout,
                getCheckoutUser:getCheckoutUser
            }
        }>
        {props.children}
    </Checkout.Provider>
}