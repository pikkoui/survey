import React, { Component } from "react"
import axios from 'axios'
import Question from "./question";
import StarRating from './starrating'
import { PrimaryButton } from '@fluentui/react/lib/Button';
import styles from './style.css'

export default class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            questions: [],
            questions_ans: {},
            load: '',
            rating: null,
            view: Math.random() > 0.5 ? 'survey' : 'starrating'
        }

    }

    getSusveyQuestionList() {
        // GET request using axios with error handling
        axios.get('http://localhost:8110/api/surveyquestions/')
            .then(response => {
                    this.setState({questions: response.data})
                }
            )
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }

    componentDidMount() {
        this.getSusveyQuestionList()
    }

    submit() {
        let self = this;
        let body = '';
        if(this.state.view == 'starrating') {
            body = {
                "user": 1,
                "rating": this.state.rating
            }
            axios.post('http://localhost:8110/api/userratings/', body, )
                .then(response =>  window.location.reload(false) )
                .catch(error => {
                    console.error('There was an error!', error);
            });
        } else {
            let body = [];
            console.log("Questions_ans")
            console.log(this.state.questions_ans)
            for (const [key, value] of Object.entries(this.state.questions_ans)) {
                console.log("Malli")
                console.log(value)
                for (const v of value['selections']) {
                    console.log("Debbug")
                    console.log(v)
                    body.push(
                        {
                            "user": 1,
                            "surveyquestion": parseInt(key),
                            "answer": v
                        }
                    )
                }
                if(value['free_text']) {
                    body.push(
                        {
                            "user": 1,
                            "surveyquestion": parseInt(key),
                            "free_text_answer": value['free_text']
                        }
                    )
                }
            }
            console.log("RESULT")
            console.log(body)
            axios.post('http://localhost:8110/api/userresponses/create_multiple/', body, )
                .then(response => window.location.reload(false) )
                .catch(error => {
                    console.error('There was an error!', error);
            });
        }
    }

    changeSingleHandler(question_id, selection, text=null) {
        let tmpstate = Object.assign({}, this.state);

        if(!tmpstate['questions_ans'][question_id])
            tmpstate['questions_ans'][question_id] = {};

        if(text == null) {
            tmpstate['questions_ans'][question_id]['selections'] = [selection];
            tmpstate['questions_ans'][question_id]['free_text'] = ''
        } else {
            tmpstate['questions_ans'][question_id]['free_text'] = text;
            tmpstate['questions_ans'][question_id]['selections'] = []
        }

        this.setState({ ...tmpstate })
    }

    changeMultipleHandler(question_id, selection, text=null) {
        let tmpstate = Object.assign({}, this.state);

        if(!tmpstate['questions_ans'][question_id]){
            tmpstate['questions_ans'][question_id] = {}
        }
        if(text == null) {
            tmpstate['questions_ans'][question_id]['selections'] = selection;
        } else {
            tmpstate['questions_ans'][question_id]['free_text'] = text
        }
        this.setState({ ...tmpstate })
    }

    ratingHandler(rating) {
        this.setState({ rating: rating })
    }

    render() {
        console.log("RENDER")
        console.log(this.state)
        let self = this;

        return (
            <div>
                <div>
                    {this.state.view == 'survey' ?
                        this.state.questions.map(function(object, i){
                            return <Question obj={object} key={object.id} changesinglehandler={self.changeSingleHandler.bind(self)} changemultiplehandler={self.changeMultipleHandler.bind(self)} />;
                        }) :
                        <StarRating ratingHandler={this.ratingHandler.bind(this)}/>
                    }

                </div>
                <div className="allignright">
                    <PrimaryButton className="button" text="Submit" onClick={this.submit.bind(this)} allowDisabledFocus disabled={false} checked={true} />
                </div>
            </div>
        )
    }
}
