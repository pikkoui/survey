import React, { Component } from "react"
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup'
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { TextField } from '@fluentui/react/lib/TextField';
import Singlechoice from './singleichoice'
import styles from './style.css'
import Multichoice from "./multichoice";

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey_question_id: this.props.obj.id,
            answer: null,
            free_text_answer:""
        }
    }

    onChange(event, choice) {
        this.props.changehandler(this.props.obj.id, choice.key, 'single')
    }

    onChangeTextField(event, text) {
        this.props.changehandler(this.props.obj.id, -1, 'free_text', null, text);
    }

    render() {
        return (
            <>
                <div className="question">
                    <h3>{this.props.obj.question_obj.text}</h3>
                </div>
                <div>
                    {
                        this.props.obj.question_obj.questiontype_obj.type == 'single_option' ? <Singlechoice obj={this.props.obj} changehandler={this.props.changesinglehandler}/> :
                        <Multichoice obj={this.props.obj} changemultiplehandler={this.props.changemultiplehandler} />
                    }

                </div>
            </>
        )
    }

}
