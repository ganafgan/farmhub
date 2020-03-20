import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import React, { Component } from 'react'

class Loading extends Component{
    state = {
        tooLong : false
    }

    componentDidMount(){
        this.handleTooLong()
    }

    handleTooLong = () => {
       this.timer =  setTimeout(
            () => this.setState({tooLong : true}), 10000
        )
    }

    componentWillMount(){
        clearInterval = this.timer
    }
    render(){
        return(
            <div className='row justify-content-center align-items-center' style={{height:'80vh'}}>
                {
                    this.state.tooLong ?
                    <h1>Network Anda Bermasalah !!!</h1>
                    : 
                    <Loader
                        type='Plane'
                        color='#00BFFF'
                        height={100}
                        width={100}
                    />
                }
            </div>
        )
    }
}

export default Loading