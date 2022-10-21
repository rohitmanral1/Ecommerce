import React, { createContext } from "react"

export const Contact = createContext()
async function addContact(item) {
    var rawdata = await fetch("/contact", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    })
    var result = await rawdata.json()
    if (result)
        return { result: "Done", message: "Thanks to Share Your Query With US!!!\nOur Team Will Contact You Soon!!!!" }
    else
        return { result: "Fail", message: "Internal Server Error" }
}
async function updateContact(item) {
    var rawdata = await fetch("/contact/" + item._id, {
        method: "put",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    })
    var result = await rawdata.json()
    if (result)
        return { result: "Done", message: "Contact is Update" }
    else
        return { result: "Fail", message: "Internal Server Error" }
}
async function getContact() {
    var rawdata = await fetch("/contact")
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
async function getSingleContact(item) {
    var rawdata = await fetch("/contact/" + item._id)
    var result = await rawdata.json()
    var { id, ...x } = result
    if (result)
        return { result: "Done", data: { _id: id, ...x } }
    else
        return { result: "Fail", message: "Internal Server Error" }
}
async function deleteContact(item) {
    var rawdata = await fetch("/contact/" + item._id, {
        method: "delete"
    })
    var result = await rawdata.json()
    console.log(result);
    return { result: "Done", message: "Contact is Deleted" }
}
export default function ContactContextProvider(props) {
    return <Contact.Provider value={
        {
            add: addContact,
            getContact: getContact,
            deleteData: deleteContact,
            getSingle: getSingleContact,
            update: updateContact
        }
    }>
        {props.children}
    </Contact.Provider>
}