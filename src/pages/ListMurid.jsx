import React from 'react'
import Axios from 'axios'
import './../supports/css/ListMurid.css'

class ListMurid extends React.Component{

    state = {
        data : [],
        editForm : false,
        indexSelectedToEdit : null

    }

    componentDidMount(){
        this.getDataFromApi()
    }
    getDataFromApi = () => {
        Axios.get('http://localhost:3005/data-murid')
        .then((res) => {
            this.setState({data:res.data})
            console.log(res) 
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var inputNama = this.refs.nama.value
        var inputTahun = this.refs.tahun.value
        var inputimageUrl = this.refs.imageUrl.value

        if (inputNama && inputTahun && inputimageUrl) {
            var data = {
                nama : inputNama,
                tahun : inputTahun,
                imageUrl : inputimageUrl
            }

            Axios.post('http://localhost:3005/data-murid', data)
            .then((res)=>{
                this.getDataFromApi()
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
            this.refs.nama.value = ''
            this.refs.tahun.value = ''
            this.refs.imageUrl.value = ''
        }else{
            alert('data yang dimasukan tidak lengkap')
        }
    }

    onDeleteBtnClick = (id) => {
        Axios.delete('http://localhost:3005/data-murid/' + id)
        .then((res)=>{
            this.getDataFromApi()
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    OnEditBtnClick = (bebas) => {
        this.setState({editForm : true, indexSelectedToEdit : bebas})
    }

    onBtnCancelClick = () => {
        this.setState({editForm : false})
    }

    onBtnSaveClick = (id) => {
        var inputNamaEdit = this.refs.namaEdit.value ? this.refs.namaEdit.value : this.state.data[this.state.indexSelectedToEdit].nama
        var inputTahunEdit = this.refs.tahunEdit.value ? this.refs.tahunEdit.value : this.state.data[this.state.indexSelectedToEdit].tahun
        var inputimageUrl = this.refs.imageUrlEdit.value ? this.refs.imageUrl.value : this.state.data[this.state.indexSelectedToEdit].imageUrl
        var data = {
            nama : inputNamaEdit,
            tahun : inputTahunEdit,
            imageUrl : inputimageUrl
        }
        Axios.patch('http://localhost:3005/data-murid/' + id, data)
        .then((res)=>{
            this.getDataFromApi()
            this.setState({editForm:false})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderEditForm = () => {    
        if (this.state.editForm) {
            return(
                <div>
                    <h1 className='text-center'>List Murid</h1>
                    <div className='row justify-content-center'>
                        <div className='form-group col-md-12'>
                            <label htmlFor="">Nama</label>
                            <input ref='namaEdit' type="text" className='form-control' placeholder={this.state.data[this.state.indexSelectedToEdit].nama}/><br/>
                            <label htmlFor="">Tahun Lahir</label>
                            <input ref='tahunEdit' type="text" className='form-control' placeholder={this.state.data[this.state.indexSelectedToEdit].tahun}/><br/>
                            <label htmlFor="">Masukan URL Foto</label>
                            <input ref='imageUrlEdit' type="text" placeholder={this.state.data[this.state.indexSelectedToEdit].imageUrl} className='form-control'/><br/>
                            <button className='btn btn-success' style={{width:'100%'}} onClick={() => this.onBtnSaveClick(this.state.data[this.state.indexSelectedToEdit].id)}>Simpan</button><br/><br/>
                            <button className='btn btn-danger' style={{width:'100%'}} onClick={this.onBtnCancelClick}>Canecel</button>
                        </div>
                    </div>     
                </div>
                
            )
        }
    }

    printData = () => {

        var output = this.state.data.map((val,index)=>{
            return(
                <div className='box-card m-3' style={{width:'18rem'}}>
                    <img src={val.imageUrl} width='100%' height='325px' className='img-box'/>
                        <div className='card-body'>
                         <h5>{val.nama}</h5>
                        <p>Usia : {2020-val.tahun}</p>
                        <a href="#" style={{width:'100%'}} className='btn btn-primary mb-2' onClick={() => this.onDeleteBtnClick(val.id)}>Delete</a>
                        <a href="#" style={{width:'100%'}} className='btn btn-primary' onClick={() => this.OnEditBtnClick(index)}>Edit</a>
                        </div>
              </div>
            )
        })
    
        return output
    }

   
    render(){
        return(
           <div className='container-fluid'>
                 <h1 className='text-center'>List Murid</h1>
                <div className='row justify-content-center'>
                    <div className='form-group col-md-3'>
                        <label htmlFor="">Nama</label>
                        <input ref='nama' type="text" className='form-control' placeholder='Masukan nama'/><br/>
                        <label htmlFor="">Tahun Lahir</label>
                        <input ref='tahun' type="text" className='form-control' placeholder='Masukan tahun lahir'/><br/>
                        <label htmlFor="">Masukan URL Foto</label>
                        <input ref='imageUrl' type="text" className='form-control'/><br/>
                        <button className='btn btn-primary' style={{width:'100%'}} onClick={this.onBtnAddClick}>Add</button>
                    </div>
                </div>     
                <div className='row col-md-3 justify-content-center'>
                    {this.renderEditForm()}
                </div>
                <div className='row col-md-12 justify-content-start'>
                    {this.printData()}
                </div>
            </div>
            

        )
    }
}

export default ListMurid