import React from 'react'
import './../supports/css/Register.css'
import Validator from 'validator'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { urlApi } from '../supports/constant/urlApi'
import { Redirect } from 'react-router-dom'


class Register extends React.Component{
    state = {
        error : ''
    }

    registerClick = () => {
        
        var inputEmail = this.refs.email.value
        var inputPassword = this.refs.password.value
        var inputConfirm = this.refs.confirm.value

        if (inputEmail && inputPassword && inputConfirm) {
            if (!Validator.isEmail(inputEmail)){
                return this.setState({error : 'format email salah'})
            }
                if (inputPassword !== inputConfirm) {
                return this.setState({error : 'password tidak sama'})
                }

                Axios.get(urlApi + 'users?email=' + inputEmail)
                .then((res)=>{
                    if(res.data.length > 0){
                        return this.setState({error :'email sudah terdaftar'})
                    }
                    var data = {
                        email : inputEmail,
                        password : inputPassword,
                        role :'',
                        fullname :'',
                        address :'',
                        phone_number :''

                    }
                    Axios.post(urlApi + 'users', data)
                    .then((res)=>{
                        console.log(res)
                        Swal.fire({
                            icon:'success',
                            title: 'Register',
                            text : 'Register berhasil, silahkan ke menu login'
                        })
                        
                    })
                    .catch((err)=>{
                        console.log(err)
                    }) 
                })
                .catch((err)=>{
                    console.log(err)
                })
                //Register
        }else{
            this.setState({error: 'Form Harus Di isi Lengkap'})
        }
        
    }

    closeBtnError = () => {
        this.setState({error : ''})
    }

    renderError = () => {
        if (this.state.error) {
            return(
                <div className='alert alert-danger mt-3 row justify-content-between'>
                    <span>
                    {this.state.error}
                    </span>
                    <span onClick={this.closeBtnError} style={{cursor : 'pointer'}}>X</span>
                </div>
            )
        }
    }
    render(){
        return(
            <div className='d-flex justify-content-center mt-5 mb-5'>
                    <form className='box-login p-5'>
                        <h4 className='text-center'>FarmHub</h4>
                        <h5 className='text-center mb-3'>Register Form</h5>
                        <div className='form-group'>
                            <label for='exampleInputEmail1'>Email Adress</label>
                            <input ref='email' type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='masukan email'/>
                        </div>
                        <div className='form-group'>
                            <label for="exampleInputPassword1">Password</label>
                            <input ref='password' type='password' className='form-control' id='exampleInputPassword1' placeholder='masukan password'/>
                        </div>
                        <div className='form-group'>
                            <label for="exampleInputPassword1">Confirm Password</label>
                            <input ref='confirm' type='password' className='form-control' id='exampleInputPassword1' placeholder='masukan ulang password'/>
                        </div>
                        <br/>
                        <input type="button" value='register' className='btn btn-outline-primary' onClick={this.registerClick} style={{width:'100%'}}/>
                        {this.renderError()}
                    </form>
                </div>
        )
    }
}

export default Register