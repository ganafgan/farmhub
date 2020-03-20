import React from 'react'
import { render } from '@testing-library/react'
import './../supports/css/Footer.css'

class FooterFarmHub extends React.Component{
    render(){
        return(
            <div className='my-footer py-5 container-fluid'>
                <div className="row">

                    <div className="col-md-3">
                        <div className="farmhub-footer-title">
                            SITEMAP
                        </div>
                        <div className="farmhub-footer-items-wrapper">
                            <div className="farmhub-footer-item">
                                Product
                            </div>
                            <div className="farmhub-footer-item">
                                About
                            </div>
                            <div className="farmhub-footer-item">
                                Contact
                            </div>
                            <div className="farmhub-footer-item">
                                Career
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="farmhub-footer-title">
                            ADRESS
                        </div>
                        <div className="farmhub-footer-items-wrapper">
                            <div className="farmhub-footer-item">
                                Jl. Gatot Subroto Nomor 25, Jakarta Selatan
                            </div>
                            <div className="farmhub-footer-item">
                                Jl. Trunojoyo Nomor 11, Bandung
                            </div>
                            <div className="farmhub-footer-item">
                                Jl. Jendral Sudirman nomor 30, Surabaya
                            </div>
                            <div className="farmhub-footer-item">
                                Jl. Malioboro Nomor 40, Yogyakarta
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3">
                        <div className="farmhub-footer-title">
                            OPERATIONAL HOURS
                        </div>
                        <div className="farmhub-footer-items-wrapper">
                            <div className="farmhub-footer-item">
                                Monday - Friday
                            </div>
                            <div className="farmhub-footer-item">
                                09.00 - 18.00 
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default FooterFarmHub