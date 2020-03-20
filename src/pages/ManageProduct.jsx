import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import Loading from './../components/Loading'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class ManageProduct extends React.Component{

    state = {
        data : null
    }

    componentDidMount(){
        this.getDataProduct()
    }

    getDataProduct = () => {
        var id = localStorage.getItem('id')
        Axios.get(urlApi + 'products?id_penjual=' + id)
        .then((res)=>{
            console.log(res.data)
            this.setState({data : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    // onBtnDeleteClick = (id) => {
    //     // let id = window.location.pathname.split('/')[2]
    //     Axios.delete(urlApi + 'products/' + id)
    //     .then((res)=>{
    //         console.log(res)
    //         this.getDataProduct()
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }
    
    onBtnDelete = (id, name) => {
        Swal.fire({
            title : "Delete data",
            text : 'Yakin Menghapus data ' + name + '?',
            showCancelButton : true,
            icon : 'warning',
            cancelButtonColor :'red'
        })
        .then((val)=>{
            if(val.value){
                Axios.delete(urlApi + 'products/' + id)
                .then((res)=>{
                    Swal.fire('Delete berhasil')
                    this.getDataProduct()
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
    }

    renderData = () => {
        return this.state.data.map((val, index)=>{
            return(
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{val.name}</td>
                    <td>Rp {val.price}</td>
                    <td>{val.stock}</td>
                    <td>{val.deskripsi}</td>
                    <td><img src={val.img_url} alt="broken" width='100px' height='100px'/></td>
                    <td><input type='button' value='Delete' className='btn btn-danger' onClick={() => this.onBtnDelete(val.id, val.name)}></input></td>
                    <Link to={'/editproduct/'+ val.id} >
                        <td><input type='button' value='Edit' className='btn btn-success'></input></td>
                    </Link>
                </tr>
            )
        })
    }

    render(){
        if(this.state.data === null){
            return(
               <Loading/>
            )
        }
        return(
            <div className='container'>
                <h4 className='text-center'>Manage Your Product</h4>
                <div className='table-responsive'>
                    <table className="table mt-5">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Deskripsi</th>
                                <th scope="col">Image Url</th>
                                <th scope="col">Delete</th>
                                <th scope="col">edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ManageProduct