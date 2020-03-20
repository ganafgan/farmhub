import React from 'react';
import FarmHubNavbar from './components/Navbar';
import FooterFarmHub from './components/Footer';
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import { Route } from 'react-router-dom'
import LatihanFakeApi from './pages/LatihanFakeApi';
import ListMurid from './pages/ListMurid'
import SelectRole from './pages/SelectRole';
import CompleteYourProfile from './pages/CompleteYourProflie';
import Axios from 'axios'
import { urlApi } from './supports/constant/urlApi';
import PostProduct from './pages/PostProduct';
import SellerDetail from './pages/SellerDetail'
import ManageProduct from './pages/ManageProduct';
import EditProduct from './pages/EditProduct';
import HalamanDumy from './pages/HalamanDumy';
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut';

class App extends React.Component {
    state = {
        dataUser : null,
        cobaTampung : null
    }

    onChangedataUser = (data) => {
        this.setState({dataUser : data})
    }

    componentDidMount(){
        //ambil dari local storage
        var id = localStorage.getItem('id')

        if (id !== null){
            //ambil data kembali
            Axios.get(urlApi + 'users/' + id)
            .then((res)=>{
                this.setState({dataUser : res.data})
            })
            .catch((err)=>{
                console.log(err)
            })          
        }
    }

    onDeleteDataUser = () => {
        this.setState({dataUser : null})
    }

    render() {
        return (
            <div>
                <FarmHubNavbar fnDeleteDataUser={this.onDeleteDataUser} dataUser={this.state.dataUser}/>
                    <div style = {{ minHeight: '80vh' } }>
                        <Route exact path = '/' >
                            <ProductList dataUser = {this.state.dataUser}/>
                        </Route> 

                        <Route path = '/login' >
                            < Login onChange={this.onChangedataUser}/>
                        </Route> 

                        <Route path = '/register' >
                            <Register/>
                        </Route>

                        <Route path = '/productdetail' >
                            <ProductDetail fnrole = {this.state.dataUser}/>
                        </Route> 

                        <Route path = '/fake-api' >
                            <LatihanFakeApi />
                        </Route>
                        
                        <Route path = '/listmurid'>
                            <ListMurid />
                        </Route>

                        <Route path = '/selectrole' >
                            <SelectRole />
                        </Route>

                        <Route path = '/complete-your-profile' >
                            <CompleteYourProfile dataUser={this.state.dataUser}/>
                        </Route> 

                        <Route path = '/postproduct' >
                            <PostProduct />
                        </Route> 

                        <Route path = '/sellerdetail' >
                            <SellerDetail />
                        </Route> 

                        <Route path = '/manageproduct' >
                            <ManageProduct />
                        </Route>

                        <Route path = '/editproduct' >
                            <EditProduct />
                        </Route>

                        <Route path = '/halaman-dumy' >
                            <HalamanDumy />
                        </Route>

                        <Route path = '/cart' >
                            <Cart />
                        </Route>

                        <Route path='/checkout'>
                            <CheckOut/>
                        </Route>
                    </div> 
                <FooterFarmHub />
            </div>
        )
    }
}

export default App;