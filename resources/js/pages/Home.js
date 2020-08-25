import React, {Component} from 'react';
import {get as getCommites} from '../containers/Committees';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            comittes: null
        }
    }



    getCommites() {
        getCommites().then(data => {
            this.setState({ comittes: data });
            console.log(data);
        })
    }

    componentDidMount() {
        this.getCommites();
    }

    render(){
        return (
            <p>Home</p>
        )
    }
}
export default Home;
