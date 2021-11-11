import React, { Component } from "react"
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup'
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { TextField } from '@fluentui/react/lib/TextField';
import styles from './style.css'

export default class Singlechoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            user_choice_answer: null,
            free_text_answer: '',

        }
    }

    componentDidMount() {
        let answers = this.props.obj.answer_set.map((answer) => {
            return {key: answer.id, text: answer.answer}
        });

        if(this.props.obj.freetext_answer_available)
           answers.push({key: -1, text: 'Other'})

        this.setState({ answers })
    }

    onChange(event, choice) {
        // avoid sending choice Other to backend, only free text answer
        // will be sent
        if(choice.key !== -1) {
            this.setState({user_choice_answer: choice.key},
                () => {
                    this.props.changehandler(this.props.obj.id, choice.key)
                }
            )
        }
    }

    onChangeTextField(event, text) {
        this.setState({free_text_answer: text},
            () => {
                this.props.changehandler(this.props.obj.id, this.state.user_choice_answer, text)
            }
        )
    }

    render() {
        return (
            <div>
                <ChoiceGroup options={this.state.answers} onChange={this.onChange.bind(this)} />
                <div className="textarea"> <TextField onChange={this.onChangeTextField.bind(this)} /> </div>
            </div>
        )
    }
}
