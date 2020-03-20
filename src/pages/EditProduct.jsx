import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import { Link } from 'react-router-dom'
import Loading from './../components/Loading'



class EditProduct extends React.Component{

    state = {
        data : null
    }

    componentDidMount(){
        this.getDataProduct()
    }

    getDataProduct = () => {
        var id = window.location.pathname.split('/')[2]
        Axios.get(urlApi + 'products/' + id) 
        .then((res)=>{
            // console.log('dapat data')
            this.setState({data : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    onSaveBtnClick = () => {

        // var refs = ['name','price','stock','img_url','deskripsi']
        // var data = {id_penjual : localStorage.getItem('id') }

        // for (let i = 0; i < refs.length; i++) {
        //     if(this.refs[refs[i]].value){
        //         data[refs[i]] = this.refs[refs[i]].value
        //     }else{
        //         return alert('Error, form harus di isi semua')
        //     }
        // }

        var inputName = this.refs.name.value
        var inputPrice = this.refs.price.value
        var inputStock = this.refs.stock.value
        var inputDeskripsi = this.refs.deskripsi.valu
        var inputImgUrl = this.refs.img_url.value

        var data = {
            name : inputName,
            price : inputPrice,
            stock : inputStock,
            deskripsi : inputDeskripsi,
            img_url : inputImgUrl
        }

        var id = window.location.pathname.split('/')[2]
        Axios.patch(urlApi + 'products/' + id, data)
        .then((res)=>{
            console.log(res)
            this.setState({data : res.data})
            alert('Data telah di tambahkan')
            window.location='/manageproduct'
        })
        .catch((err)=>{
            console.log(err)
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
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-4 my-card p-4'>
                        <h4 className='text-center mb-5'>Edit Product</h4>
                        <input ref='name' type="text" className='form-control' defaultValue={this.state.data.name}/><br/>
                        <input ref='price' type="text" className='form-control' defaultValue={this.state.data.price}/><br/>
                        <input ref='stock' type="text" className='form-control' defaultValue={this.state.data.stock}/><br/>
                        <input ref='deskripsi' type="text" className='form-control' defaultValue={this.state.data.deskripsi}/><br/>
                        <input ref='img_url' type="text" className='form-control' defaultValue={this.state.data.img_url}/><br/>
                        <input type="button" className='btn btn-success' value='SAVE' style={{width:'100%'}} onClick={this.onSaveBtnClick}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProduct