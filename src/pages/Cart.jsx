import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import Loading from '../components/Loading'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

class Cart extends React.Component{
    state = {
        num : 1,
        data : null,
        dataCart : null,
        // dataProduct : null  
    }
    
    componentDidMount(){
        var id = window.location.pathname.split('/')[2]
        this.getProductDetail(id)
        this.getDataCart()
    }

    getDataCart = () => {
        var id = localStorage.getItem('id')
        Axios.get(urlApi + 'cart?id_pembeli=' + id)
        .then((res)=>{
            console.log(res)
            this.setState({dataCart : res.data})
        })
        .then((err)=>{
            console.log(err)
        })
    }

    getProductDetail = (param) => {
        Axios.get(urlApi + 'products/' + param)
        .then((res)=>{
            console.log(res)
            this.getDataPenjual(res.data.id_penjual)
            this.setState({data : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    onBtnDelete = (id, nama_product) => {
        Swal.fire({
            title : "Delete data",
            text : 'Yakin Menghapus data ' + nama_product + '?',
            showCancelButton : true,
            icon : 'warning',
            cancelButtonColor :'red'
        })
        .then((val)=>{
            if(val.value){
                Axios.delete(urlApi + 'cart/' + id)
                .then((res)=>{
                    Swal.fire('Delete berhasil')
                    this.getDataCart()
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
    }


    // onBtnPlusClick = () => {
    //     this.setState({num : this.state.num < this.state.data.stock ?  this.state.num + 1 : this.state.data.stock})
    // }

    // onBtnMinClick = () => {
    //     this.setState({num : this.state.num !== 1 ? this.state.num - 1 : 1})
    // }

    totalHarga = () => {
        return this.state.data.price * this.state.num
    }

    renderDataCart = () => {
         return this.state.dataCart.map((val, index)=>{
            return(
                <tr key="id">
                    <th scope="row">{index + 1}</th>
                    <td>{val.nama_product}</td>
                    <td>Rp {val.harga_product}</td>                   
                    <td>
                        <button onClick={this.onBtnMinClick}>-</button>
                        <span className='mx-3'> {val.qty}</span>
                        <button onClick={this.onBtnPlusClick}>+</button>
                    </td>
                     <td></td>
                    <td><img src={val.img_url} alt="broken" width='100px' height='100px'/></td>
                    <td><input type='button' value='Delete' className='btn btn-danger' onClick={() => this.onBtnDelete(val.id, val.nama_product)}></input></td>
                </tr>
            )
        })
        
    }

    render(){
        if (this.state.dataCart === null) {
            return(
                <Loading/>
            )
        }
        return(
            <div className='container'>
                <h4 className='text-center'>Cart Product</h4>
                <div className='row'>
                    <div className='col-md-10'>
                        <div className='table-responsive'>
                            <table className="table mt-5">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Jumlah</th>
                                        <th scope='col'>Total</th>
                                        <th scope="col">Image Url</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderDataCart()}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                    <div className='col-md-2'>
                        <div className="card mt-5" style={{width:'18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">Rincian Belanja</h5>
                                <hr style={{border:'1px solid black'}}/>
                                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                                <div className='mb-3'>
                                <p className="card-text">Total Harga</p>

                                </div>
                                <Link to='/checkout'>  
                                    <input type="button" className='btn btn-success' value='Checkout' style={{width:'100%'}}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

export default Cart