import React, { Component } from 'react'

class Test extends Component {
    componentDidMount(){
        console.log("Component did mount...");
    }


    render() {
        return (
            <div>
                <h1>The Test Component</h1>
            </div>
        )
    }
}

export default Test; 
