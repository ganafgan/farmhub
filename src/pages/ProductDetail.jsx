import React from 'react'
import './../supports/css/ProductDetail.css'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class ProductDetail extends React.Component {

    state = {
        num : 1,
        data : null,
        dataPenjual : null,
        // dataProduct : null
    }

    componentDidMount(){
        var id = window.location.pathname.split('/')[2]
        this.getProductDetail(id)
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

    getDataPenjual = (id_penjual) => {
        Axios.get(urlApi + 'users/' + id_penjual)
        .then((res)=>{
            console.log(res)
            this.setState({dataPenjual : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getDataToCart = () => {

        var data = {
            id_pembeli :localStorage.getItem('id') ,
            id_penjual : this.state.data.id_penjual ,
            id_product : this.state.data.id,
            nama_product : this.state.data.name,
            qty : this.state.num ,
            harga_product : this.state.data.price,
            img_url : this.state.data.img_url

        }
        // var idn = window.location.pathname.split('/')[2]
        Axios.post(urlApi + 'cart/' , data)
        .then((res)=>{
            console.log(res)
            Swal.fire('berhasil ditambah ke cart')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onBtnPlusClick = () => {
        this.setState({num : this.state.num < this.state.data.stock ?  this.state.num + 1 : this.state.data.stock})
    }

    onBtnMinClick = () => {
        this.setState({num : this.state.num !== 1 ? this.state.num - 1 : 1})
    }

    totalHarga = () => {
        return this.state.data.price * this.state.num
    }

    fnRenderBtn = () => {
        if(this.props.fnrole !== null){
            if(this.props.fnrole.role === 'penjual'){
                return(
                    <div className="btn btn-warning">Gak Bisa Beli</div>
                )
            }else{
                return(
                    <div className="btn btn-warning" onClick={this.getDataToCart}>Masukan Keranjang</div>
                )
            }
        }else{
            return(
                <Link to='/login'>
                     <div className="btn btn-warning">Harus Login Untuk Beli</div> 
                </Link>
            )
        }
    }

    render(){
        if(this.state.data === null || this.state.dataPenjual === null){
            return(
                <Loading/>
            )
        }
        return(
        
            <div className="container-fluid my-5">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-4 my-5 my-card">
                        <img src={this.state.data.img_url} width='100%' alt=""/>                   
                        </div>
                        <div className="col-sm-7 my-5">
                                <div className='farmhub-product-detil-title'>{this.state.data.name}</div>
                                <div className='farmhub-product-detil-price'>Rp. {this.state.data.price}</div>
                                <div className='farmhub-product-detil-location'>Jakarta Selatan</div>
                                <div className='farmhub-product-detil-stok'>Stock : {this.state.data.stock}</div>
                                <div className='my-2'>
                                    <button onClick={this.onBtnMinClick}>-</button>
                                    <span className='mx-3'>{this.state.num}</span>
                                    <button onClick={this.onBtnPlusClick}>+</button>
                                </div>
                                <Link to={'/sellerdetail/' + this.state.data.id_penjual}>
                                    <span style={{cursor:'pointer',textDecoration:'underline'}}>{this.state.dataPenjual.fullname} - {this.state.dataPenjual.address}</span>
                                </Link>
                        </div>
                    </div>

                    <hr/>
                    <div className='farmhub-product-detil-info'>Informasi Produk</div>
                    <div className='farmhub-product-detil-location'>1. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
                    <div className='farmhub-product-detil-location'>2. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
                    <div className='farmhub-product-detil-location'>3. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
                </div>
                <div className="d-flex justify-content-end keranjang shadow fixed-bottom p-3">
                    <div className="justify-content-end align-items-center ">
                        <div className='total text-muted'>Total</div>
                         <div className='harga'>{this.totalHarga()}</div>
                    </div>
                    <div className="col-sm-3">
                        <Link>
                            {this.fnRenderBtn()}
                        </Link>
                    </div>
                </div>
            </div>         
            
        )
    }
}

export default ProductDetail