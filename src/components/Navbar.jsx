import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Dropdown
} from 'reactstrap';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';

class FarmHubNavbar extends React.Component{
  state = {
    isOpen : false
  }

  toggle = () => {
    this.setState({isOpen : !this.state.isOpen})
  }

  onLogoutClick = () => {
	  Swal.fire({
		title: 'Logout',
		text: "Yakin akan Logout ?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes'
	  })
	  .then((val)=>{
		  if(val.value){
			localStorage.removeItem('id')
			this.props.fnDeleteDataUser()
			window.location='/'
		  }
	  })
  }
  render(){  
		return(
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">FarmHub</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
						</Nav>
						{
							this.props.dataUser == null ?
							<Nav navbar>
								<NavLink href='/login'>
									<span className='mr-3 my-navbar-Link'>Login</span>
								</NavLink>
								<NavLink href='/register'>
									<span className='mr-3 my-navbar-Link'>Register</span>
								</NavLink>
								{/* <NavLink href='/productdetail'>
									<span className='mr-3 my-navbar-Link'>Product Detail</span>
								</NavLink> */}
							</Nav>
							:
							<Nav navbar>
								{
									this.props.dataUser.role =='pembeli' ?
									<NavItem>
										<NavLink href='/cart'>
											<span className='my-navbar-link mr-3'>Cart</span>
										</NavLink>
									</NavItem>
									:
									this.props.dataUser.role == 'penjual' ?
									<NavItem>
										<UncontrolledDropdown nav inNavbar>
											<DropdownToggle nav caret>
												Menu
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem href='/postproduct'> 
													Post Product
												</DropdownItem>
												<DropdownItem href='/manageproduct'>
													Manage Product
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
										{/* <NavLink href='/postproduct'>
											<span className='my-navbar-link mr-3'>Post Product</span>
										</NavLink> */}
									</NavItem>
									:
									null
								}
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										Hello, {this.props.dataUser.email}
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>
											Change Profile
										</DropdownItem>
										<DropdownItem>
											History
										</DropdownItem>
										<DropdownItem divider />
										<DropdownItem onClick={this.onLogoutClick}>
											Logout
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
								{/* <Link to='/my-profile'>
									<span className='mr-3 my-navbar-Link'>Selamat datang,{this.props.dataUser.email}</span>
								</Link> */}
							</Nav>
						}
					  </Collapse>
				</Navbar>
			</div>
		)	
	  	
  	}
}

export default FarmHubNavbar