import React from 'react'
import Axios from 'axios'

class LatihanFakeApi extends React.Component{

    state = {
        data : []
    }

    componentDidMount(){
        this.getDataFromApi()
    }

    getDataFromApi = () => {
        Axios.get('http://localhost:3006/todos')
        .then((res) => {
            this.setState({data:res.data})
            console.log(res.data)
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    onAddBtnClick = () => {
        var inputTodo = this.refs.todo.value
        var inputUser = this.refs.user.value
        if (inputTodo && inputUser) {
    
                var data = {
                    user : inputUser ,
                    todo : inputTodo
                }
        
                Axios.post('http://localhost:3006/todos',data)
                .then((res) => {
                    this.getDataFromApi()
                    console.log(res)
                })
                .catch((err)=> {
                    console.log(err)
                })
        }else{
            alert('data harus di isi semua')
        }
    }

    printData = () =>{
       
        // for (let i = 0; i < this.state.data.length ; i++) {
        //     output.push(
        //         <li className='list-group-item'>
        //             {this.state.data[i].todo + " " + '(' + this.state.data[i].user + ')'}
        //             <span className='btn btn-outline-primary ml-3'>edit</span>
        //             <span className='btn btn-outline-danger ml-3'>delete</span>   
        //         </li>
        //     )    
        
        // }
        var output = this.state.data.map((val) =>{
            return(

            <li className='list-group-item'>
                {val.todo + " " + '(' + val.user + ')'}
                <span onClick={() => this.onDeleteBtnClick(val.id)} className='btn btn-outline-primary ml-3'>delete</span>
                <span className='btn btn-outline-danger ml-3'>edit</span>   
            </li>
            )
            })
        console.log(output)    
        return output
    }

    onDeleteBtnClick = (id) =>{
        Axios.delete('http://localhost:3001/todos/' + id)
        .then((res)=>{
            this.getDataFromApi()
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h1 className='text-center'>Fake API Page</h1>
                <div className='container mt-5'>
                    <div className='row justify-content-center'>
                        <div className='col-md-4'>
                            <ul className='list-group mb-3'>
                              {this.printData()}
                            </ul>
                            <input type="text" ref ='todo' name="" id="" className='form-control' placeholder='what will you do ?'/><br/>
                            <input type="text" ref = 'user' className='form-control' placeholder='your name'/><br/>
                            <button className='btn btn-outline-primary' onClick={this.onAddBtnClick}>ADD</button>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

export default LatihanFakeApi