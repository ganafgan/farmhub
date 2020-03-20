import React from 'react'
import './../supports/css/Login.css'
import Axios from 'axios'
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'
import { urlApi } from '../supports/constant/urlApi'


class Login extends React.Component{

    state = {
        isComplete : null
    }

    onBtnclick = () => {
        var inputEmail = this.refs.email.value
        var inputPassword = this.refs.password.value

        if (inputEmail && inputPassword){
            Axios.get(urlApi + `users?email=${inputEmail}&password=${inputPassword}`)
            .then((res)=>{
                if (res.data.length > 0) {
                    console.log(res)
                    //Login Success
                    var dataUser = res.data[0]
                    this.props.onChange(dataUser)
                    //console.log(res.data)

                    //Menyimpan data di local storage
                    localStorage.setItem('id', res.data[0].id)
                    if (res.data[0].role) {
                        this.setState({isComplete:true})
                    }else{
                        this.setState({isComplete:false})
                    }
                }else{
                    Swal.fire('Error','Password or email invalid', 'error')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            return Swal.fire('Error','Semua Form Harus Di isi','error')
        }
    }
        render(){

            if (this.state.isComplete == false) {
                return(
                    <Redirect to='/selectrole'/>
                )
            }
            if (this.state.isComplete == true) {
                return(
                    <Redirect to='/'/>
                )
            }
            return(
                <div className='d-flex justify-content-center mt-5 mb-5'>
                    <form className='box-login p-5'>
                        <h4 className='text-center'>FarmHub</h4>
                        <h5 className='text-center mb-3'>Login</h5>
                        <div className='form-group'>
                            <label for='exampleInputEmail1'>Email Adress</label>
                            <input ref ='email' type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='masukan email'/>
                        </div>
                        <div className='form-group'>
                            <label for="exampleInputPassword1">Password</label>
                            <input ref='password' type='password' className='form-control' id='exampleInputPassword1' placeholder='masukan password'/>
                        </div>
                        <br/>
                        <input type="button" className='btn btn-outline-primary w-100' onClick={this.onBtnclick} value='login'/><br/><br/>
                    </form>
                </div>
            )
        }
    }

export default Login