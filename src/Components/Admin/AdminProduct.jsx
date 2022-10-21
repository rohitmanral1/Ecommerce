import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import LeftNav from './LeftNav'

import { Product } from '../../Store/ProductContextProvider';

import pic1 from "../../assets/productimages/p1.jpg"
import pic2 from "../../assets/productimages/p2.jpg"
export default function AdminProduct() {
    var [product, setproduct] = useState([])
    var { getProduct,deleteData} = useContext(Product)
    async function getAPIData() {
        var response = await getProduct()
        if (response.result === "Done")
            setproduct(response.data)
        else
            alert(response.message)
    }
    async function deleteRecord(_id){
        if(window.confirm("Are Your Sure to Delete : ")){
            var item = {
                _id:_id
            }
            await deleteData(item)
            getAPIData()
        }
    }
    useEffect(() => {
        console.log(pic1,pic2);
        getAPIData()
    }, [])
    return (
        <div className='container-fluid mt-2'>
            <div className='row'>
                <div className='col-lg-2 col-md-4 col-sm-6 col-12'>
                    <LeftNav />
                </div>
                <div className='col-lg-10 col-md-8 col-sm-6 col-12'>
                    <h5 className='background text-light text-center p-1'>Product Section <Link to="/admin-add-product"><AddIcon className="text-light" /></Link></h5>
                    <div className='table-responsive'>
                        <table className='table table-light table-striped table-hover'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Maincategory</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Base Price</th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th>Stock</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {
                                    product.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.maincategory}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.brand}</td>
                                            <td>&#8377;{item.baseprice}</td>
                                            <td>{item.discount}%</td>
                                            <td>&#8377;{item.finalprice}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>{item.stock}</td>
                                            <td><img src={ require(`../../assets/productimages/${item.pic1}`)} width="100px" height="75px" className='rounded-1' alt=''></img></td>
                                            <td><img src={ require(`../../assets/productimages/${item.pic2}`)} width="100px" height="75px" className='rounded-1' alt=''/></td>
                                            <td><img src={ require(`../../assets/productimages/${item.pic3}`)} width="100px" height="75px" className='rounded-1' alt=''/></td>
                                            <td><img src={ require(`../../assets/productimages/${item.pic4}`)} width="100px" height="75px" className='rounded-1' alt=''/></td>
                                            <td><Link to={`/Admin-update-Product/${item._id}`}><EditIcon /></Link></td>
                                            <td><button className='btn mybtn' onClick={()=>deleteRecord(item._id)}><DeleteForeverIcon className="text-danger"/></button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
