import React, { Component } from 'react';
import { get, store, find, update, destroy, rules } from '../containers/LearnerNovelties';
import { validate, formValid, setRules } from '../containers/Validator';
import { get as getLearners } from '../containers/Learners'
import Loader from '../components/Loader';
import { data } from 'jquery';


class LearnerNovelties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learnerNovelties: null,
            learnersId: null,
            edit: false,
            id: null,
            message:null,
            rules: rules
        }
        this.getLearners = this.getLearners.bind(this);
        // this.handleEdit = this.handleEdit.bind(this);
        // this.handleModal = this.handleModal.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleInput = this.handleInput.bind(this);
        // this.search = this.search.bind(this);
    }

    async getLearnerNovelties () {
        this.setState({learnerNovelties: null});
        let data = await get();
        this.setState({learnerNovelties: data});
    }

    getLearners() {
        getLearners().then(data => {
            console.log(data.learner);
            this.setState({learnersId: data})
        })
    }

    
    componentDidMount() {
        this.getLearnerNovelties();
        this.getLearners();
    }

    render() {
        const { rules } = this.state;
        if (!this.state.learnerNovelties || !this.state.learnersId) {
            return (
                <Loader />
            )
        }
        return (
            <>
                <h1>Hi Socitos</h1>
            </>
        );
    }
}

export default LearnerNovelties
