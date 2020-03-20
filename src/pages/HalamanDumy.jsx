import React from 'react'

class HalamanDumy extends React.Component{
    render(){
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-2 mt-3'>
                        <div className='my-card p-3 mb-3'>
                            <input type="text" className='form-control' placeholder='search' ref='search' onChange={this.onSearchChange}/>
                        </div>
                        <div className='my-card p-3'>
                            <div className='farmhub-product-title mb-5'> 
                                Filter By Category {this.props.cobaTampung2}
                            </div>
                            <div className='farmhub-product-location'>
                            </div>
                        </div>             
                    </div>
                    <div className='col-sm-10'>
                        <div className='row'>
                        {/* Data Kosong */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HalamanDumy