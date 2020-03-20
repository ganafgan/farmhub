import React from 'react'
import './../supports/css/ProductList.css'
import { FormGroup,Label,Input } from 'reactstrap'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import Loading from './../components/Loading'
import { Link } from 'react-router-dom'



class ProductList extends React.Component{
    state = {
        data : null,
        dataPenjual : null,
        search : ''
    }

    componentDidMount(){
        this.getDataProducts()
        this.getDataPenjual()
    }

    getDataProducts = () => {
        Axios.get(urlApi + 'products')
        .then((res)=>{
            console.log(res)
            this.setState({data : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getDataPenjual = () => {
        Axios.get(urlApi + 'users?role=penjual')
        .then((res)=>{
            this.setState({dataPenjual : res.data})
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getDataAddress = (product) => {
        var penjual = this.state.dataPenjual.filter((user)=>{
            return user.id == product.id_penjual
        })
        return penjual[0].address
    }

    onSearchChange = () =>{
        this.setState({search : this.refs.search.value})
    }

    renderData = () => {
        var dataFiltered = this.state.data.filter((prod)=>{
            return prod.name.toLowerCase().startsWith(this.state.search)
        })
        if (dataFiltered.length === 0) {
            return(
                <h1>Data tidak di temukan</h1>
            )
        }
        return dataFiltered.map((val)=>{
            return(
                
                <div key={val.id} className="my-card col-sm-2 mr-3 mt-3 mb-3">
                   <Link to={'/ProductDetail/' + val.id}>
                        <img src={val.img_url} alt="" style={{width:'100%',height:'200px', objectFit:'cover',objectPosition:'top'}}/> 
                   </Link>
                    <div className='farmhub-product-title'>{val.name}</div>
                    <div className='farmhub-product-price'>Rp.{val.price}</div>
                <div className='farmhub-product-location'>{this.getDataAddress(val)}</div>
                </div>
            )
        })
    }

    renderRole = () => {
        if (this.props.dataUser !== null) {
            if (this.props.dataUser.role === '') {
                return(
                    <div class="alert alert-warning" role="alert">
                        Anda Belum Memilih Role <Link to='/selectrole'>Klik Disini</Link>
                    </div>
                )
            }
            if (this.props.dataUser.fullname === '' || this.props.dataUser.address === '' || this.props.dataUser.phone_number === '') {
                return(
                    <div class="alert alert-warning" role="alert">
                        Silahkan Lengkapi Data Anda <Link to='/complete-your-profile'>KlikDisini</Link>
                    </div>
                )
            }
        }
    }

    render(){
        if(this.state.data === null || this.state.dataPenjual === null){
            return(
               <Loading/>
            )
        }
        if(this.state.data.length === 0){
            return(
                <h1>Data Masih Kosong</h1>
            )
        }
        return(
            <div className='container-fluid'>
                {this.renderRole()}
                <div className='row'>
                    <div className='col-sm-2 mt-3'>
                        <div className='my-card p-3 mb-3'>
                            <input type="text" className='form-control' placeholder='search' ref='search' onChange={this.onSearchChange}/>
                        </div>
                        <div className='my-card p-3'>
                            <div className='farmhub-product-title mb-5'> 
                                Filter By Category {this.props.cobaTampung2}
                            </div>
                            <div className='farmhub-product-location'>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Buah Buahan
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Sayuran
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="checkbox" />{' '}
                                    Rempah Rempah
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>             
                    </div>
                    <div className='col-sm-10'>
                        <div className='row'>
                            {this.renderData()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductList