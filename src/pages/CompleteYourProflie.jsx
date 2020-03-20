import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import Swal from 'sweetalert2'

class CompleteYourProfile extends React.Component{
    state = {
        error : ''
    }

    onSaveBtnClick = () => {
        // let inputNamaLengkap = this.refs.namalengkap.value
        // let inputTelepon = this.refs.telepon.value
        // let inputAlamat = this.refs.alamat.value

        // var data = {
        //     fullname : inputNamaLengkap,
        //     phone_number : inputTelepon,
        //     address : inputAlamat
        // }

        var refs = ['fullname','phone_number','address']
        var data = {}
        for (let i = 0; i < refs.length; i++) {
            if(this.refs[refs[i]].value){
                data[refs[i]] =  this.refs[refs[i]].value
            }else{
                return Swal.fire('Error, form harus di isi semua')
            }
        }

        var id = this.props.dataUser.id
        // let id = localStorage.getItem('id')
        Axios.patch(urlApi + 'users/' + id , data)
        .then((ress)=>{
            console.log(ress)
            alert('data berhasil disimpan')
            window.location='/'
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className='row justify-content-center mt-5'>
                <div className='col-md-4 my-card p-5'>
                    <h5 className='text-center'>Lengkapi Profil Anda</h5>
                    <input ref='fullname' type="text" className='form-control mt-3' placeholder='Nama Lengkap'/>
                    <input ref='phone_number' type="text" className='form-control mt-3' placeholder='Nomor Telepon'/>
                    <input ref='address' type="text" className='form-control mt-3' placeholder='Alamat'/>
                    <button onClick={this.onSaveBtnClick} className='btn btn-outline-primary mt-3 w-100'>ADD</button>
                </div>
            </div>
        )
    }
}

export default CompleteYourProfile