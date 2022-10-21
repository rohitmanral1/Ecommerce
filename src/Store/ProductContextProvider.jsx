import React, { createContext } from "react"

export const Product = createContext()
async function addProduct(item) {
    var rawdata = await fetch("/product", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    })
    var result = await rawdata.json()
    if (result)
        return { result: "Done", message: "Product is Created" }
    else
        return { result: "Fail", message: "Internal Server Error" }
}
async function updateProduct(item) {
    var rawdata = await fetch("/product/" + item._id, {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    })
    var result = await rawdata.json()
    if (result)
        return { result: "Done", message: "Product is Update" }
    else
        return { result: "Fail", message: "Internal Server Error" }
}
async function getProduct(item) {
    var rawdata = await fetch("/product")
    var result = await rawdata.json()
    var d = []
    for (let item of result) {
        var { id, ...x } = item
        d.push({ _id: id, ...x })

    }
    if (result)
        return { result: "Done", data: d }
    else
        return { result: "Fail", message: "Internal Server Error" }
}
async function getSingleProduct(item) {
    var rawdata = await fetch("/product/" + item._id)
    var result = await rawdata.json()
    var { id, ...x } = result
    if (result)
        return { result: "Done", data: { _id: id, ...x } }
    else
        return { result: "Fail", message: "Internal Server Error" }
}
async function deleteProduct(item) {
    var rawdata = await fetch("/product/" + item._id, {
        method: "delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return { result: "Done", message: "Product is Deleted" }
}
export default function ProductContextProvider(props) {
    return <Product.Provider value={
        {
            add: addProduct,
            getProduct: getProduct,
            deleteData: deleteProduct,
            getSingle: getSingleProduct,
            update: updateProduct
        }
    }>
        {props.children}
    </Product.Provider>
}