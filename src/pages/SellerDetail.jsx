import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'

class SellerDetail extends React.Component{

    state = {
        dataPenjual : null,
        dataProduk : null
    }

    componentDidMount(){
        var param = window.location.pathname.split('/')[2]
        console.log(param)
        this.getDataPenjual(param)
        this.getDataProduk(param)
    }

    getDataPenjual = (param) => {
        Axios.get(urlApi + 'users/' + param)
        .then((res)=>{
            console.log(res)
            this.setState({dataPenjual : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getDataProduk = (param) => {
        Axios.get(urlApi + 'products?id_penjual=' + param)
        .then((res)=>{
            console.log(res)
            this.setState({dataProduk : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderDataProduk = () => {
        var output = this.state.dataProduk.map((val)=>{
            return(
                    <div key={val.id} className="my-card col-sm-2 mr-3 mt-3 mb-3">
                        <Link to={'/ProductDetail/' + val.id}>
                                <img src={val.img_url} style={{width:'100%', height:'200px'}} alt=""/> 
                        </Link>
                            <div className='farmhub-product-title'>{val.name}</div>
                            <div className='farmhub-product-price'>Rp.{val.price}</div>
                            <div className='farmhub-product-location'>Jakarta Selatan</div>
                    </div>
            )
        })
        return output
    }

    render(){
        if (this.state.dataPenjual === null || this.state.dataProduk === null) {
            return(
                <Loading/>
            )
        }
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-2 mt-3'>
                        <div className='my-card p-3 mb-3'>
                            <h4 className='text-center'>Profil Penjual</h4><br/><br/>
                            <p>Nama     : {this.state.dataPenjual.fullname}</p>
                            <p>Alamat   : {this.state.dataPenjual.address}</p>
                            <p>Telepom  : {this.state.dataPenjual.phone_number}</p>
                        </div>
                    </div>
                    <div className='col-sm-10'>
                        <div className='row'>
                            {this.renderDataProduk()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SellerDetail