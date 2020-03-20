import React from 'react'
import './../supports/css/Login.css'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'

class PostProduct extends React.Component{
    state = {
        error : ''
    }

    onSavePostProduct = () => {
        var refs = ['name','price','stock','img_url','deskripsi']
        var data = {id_penjual : localStorage.getItem('id') }

        for (let i = 0; i < refs.length; i++) {
            if(this.refs[refs[i]].value){
                data[refs[i]] = this.refs[refs[i]].value
            }else{
                return Swal.fire('Error, form harus di isi semua')
            }
        }
        Axios.post(urlApi + 'products', data)
        .then((res)=>{
            console.log(res)
            Swal.fire('Data berhasil disimpan')
            window.location='/'
        })
        .catch((err)=>{ 
            console.log(err)
            Swal.fire('Data gagal disimpan')
        })
        console.log(data)
    }
    
    
    render(){
        return(
            <div className='row justify-content-center mt-5 mb-5'>
                <div className='col-md-4 my-card p-3'>
                    <h4 className='text-center mb-5'>Post Your Product</h4>
                    <label htmlFor="">Nama Produk</label>
                    <input ref='name' type="text" className='form-control mb-3' placeholder='masukan nama produk'/>
                    <label htmlFor="">Harga Produk</label>
                    <input ref='price' type="text" className='form-control mb-3' placeholder='masukan harga produk'/>
                    <label htmlFor="">Stok Produk</label>
                    <input ref='stock'type="text" className='form-control mb-3' placeholder='masukan stok produk'/>
                    <label htmlFor="">Gambar Produk</label>
                    <input ref='img_url' type="text" className='form-control mb-3' placeholder='masukan URL gambar produk'/>
                    <label htmlFor="">Deskripsi Produk</label>
                    <input ref='deskripsi' type="text" className='form-control mb-5' placeholder='masukan deskripsi produk'/>
                    <button className='btn btn-primary w-100 mb-5' onClick={this.onSavePostProduct}>SUBMIT</button>

                </div>
            </div>
        )
    }
}

export default PostProduct