import React,{createContext} from "react"

export const Wishlist = createContext()
async function addWishlist(item){
    var rawdata = await fetch("/wishlist",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(item)
    })
    var result = await rawdata.json()
    if(result)
    return {result:"Done",message:"Wishlist is Created"}
    else
    return {result:"Fail",message:"Internal Server Error"}
}
async function getWishlist(item){
    var rawdata = await fetch("/wishlist")
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
async function deleteWishlist(item){
    var rawdata = await fetch("/wishlist/"+item._id,{
        method:"delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return {result:"Done",message:"Wishlist is Deleted"}
}
export default function WishlistContextProvider(props){
    return <Wishlist.Provider value={
            {
                addWishlist:addWishlist,
                getWishlist:getWishlist,
                deleteData:deleteWishlist
            }
        }>
        {props.children}
    </Wishlist.Provider>
}