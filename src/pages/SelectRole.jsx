import React from 'react'
import Axios from 'axios'
import { urlApi } from '../supports/constant/urlApi'
import Swal from 'sweetalert2'

class SelectRole extends React.Component{
    onBtnClick = (role) =>{
        let id = localStorage.getItem('id')
        Axios.patch(urlApi + 'users/' + id, {role : role})
        .then((res)=>{  
            alert('Selamat Sekarang Anda ' + role)
            window.location='/complete-your-profile'
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className='row justify-content-center'>
                <div className='col-md-4 my-card p-5'>
                    <h5>Pilih Role</h5>
                    <button  onClick={() => this.onBtnClick('penjual')} className='btn btn-outline-success w-100'>Seller</button><br/><br/>
                    <button onClick={() => this.onBtnClick('pembeli')} className='btn btn-outline-primary w-100'>Buyer</button>
                </div>
            </div>
        )
    }
}

export default SelectRole