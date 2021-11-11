import React, { Component } from "react"
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup'
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { TextField } from '@fluentui/react/lib/TextField';
import styles from './style.css'

export default class Multichoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            user_choice_answer: [],
            free_text_answer: '',

        }
    }

    componentDidMount() {
        let answers = this.props.obj.answer_set.map((answer) => {
            return {key: answer.id, text: answer.answer}
        });

        this.setState({ answers })
    }

    onChange(choice, event, checked) {
        if(checked) {
            this.setState({user_choice_answer: [...this.state.user_choice_answer, choice]},
                () => {
                    this.props.changemultiplehandler(this.props.obj.id, this.state.user_choice_answer)
                }
            )
        } else {
            // Remove from answers in case a checkbox is unchecked
            this.setState({
                    user_choice_answer: this.state.user_choice_answer.filter(function(ch) {
                            return ch !== choice
                        }
                    )
                }, () => {
                    this.props.changemultiplehandler(this.props.obj.id, this.state.user_choice_answer)
                })
        }
    }

    onChangeTextField(event, text) {
        this.setState({
                free_text_answer: text,
            },
            this.props.changemultiplehandler(this.props.obj.id, this.state.user_choice_answer, text)
        )
    }

    render() {
        return (
                <div>
                    {this.state.answers.map((answer) => {
                        return ( <div className="multiple-checkbox"><Checkbox  label={answer.text} onChange={this.onChange.bind(this, answer.key)} /> </div>)
                    })}

                    {this.props.obj.freetext_answer_available ? <div className="multiple-checkbox"><Checkbox label="Other" /><div className="textarea"> <TextField onChange={this.onChangeTextField.bind(this)} /> </div> </div> : ''}
                </div>
        )
    }
}
