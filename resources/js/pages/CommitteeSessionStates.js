import React, { Component } from 'react';
import { get } from '../containers/CommitteeSessionStates';
import Loader from '../components/Loader';

class CommitteeSessionState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            committeeSessionStates: null
        }
    }

    getCommitteeSessionStates() {
        get().then(data => {
            this.setState({ committeeSessionStates: data })
        })
    }

    componentDidMount(){
        this.getCommitteeSessionStates();
    }

    render() {
        return (<p>Hola</p>)
    }
}

export default CommitteeSessionState