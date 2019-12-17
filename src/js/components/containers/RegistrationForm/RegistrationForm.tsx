import * as React from 'react';
import * as StringUtils from '../../../utils/string.utils';
import { RequestFormState, RequestStatus } from '../Home/HomeComponentState';
import Button from '../../components/Button/Button';
import TextInput from '../../components/TextInput/TextInput';
require('./RegistrationForm.css');


export default class RegistrationForm extends React.Component<any, RequestFormState> {

    constructor(props: any) {
        super(props);

        this.state = {
            fullNameValid: false,
            fullNameInput: '',
            emailInput: '',
            emailConfirmationInput: '',
            validationMessage: '',
            errorMessage: ''
        } as RequestFormState;

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailConfirmationChange = this.handleEmailConfirmationChange.bind(this);
        this.generateValidationMessage = this.generateValidationMessage.bind(this);
    }

    generateValidationMessage(args: { fullName: string, email: string, emailConfirmation: string }): string {
        let msg = '';
        if (args.fullName.length < 3) {
            msg = 'Full name must be at least 3 characters in length.';
        } else if (!args.email) {
            msg = 'Please provide your email address.';
        } else if (!this.isValidEmailFormat(args.email)) {
            msg = 'Please provide a valid email address.';
        } else if (!args.emailConfirmation) {
            msg = 'Please confirm your email address.';
        } else if (args.email !== args.emailConfirmation) {
            msg = 'Both email addresses must match.';
        }
        return msg;
    }

    handleEmailChange(event: any) {
        this.setState({
            errorMessage: '',
            emailInputValid: !!this.isValidEmailFormat(event.target.value),
            emailInput: event.target.value,
            validationMessage: this.generateValidationMessage({ email: event.target.value, fullName: this.state.fullNameInput, emailConfirmation: this.state.emailConfirmationInput })
        });
        this.props.onInputEdit();
    }

    handleEmailConfirmationChange(event: any) {
        this.setState({
            errorMessage: '',
            emailConfirmationInputValid: event.target.value === this.state.emailInput,
            emailConfirmationInput: event.target.value,
            validationMessage: this.generateValidationMessage({ email: this.state.emailInput, fullName: this.state.fullNameInput, emailConfirmation: event.target.value })
        });
        this.props.onInputEdit();
    }

    handleNameChange(event: any) {
        this.setState({
            errorMessage: '',
            fullNameValid: event.target.value.length >= 3,
            fullNameInput: event.target.value,
            validationMessage: this.generateValidationMessage({ email: this.state.emailInput, fullName: event.target.value, emailConfirmation: this.state.emailConfirmationInput })
        });
        this.props.onInputEdit();
    }

    isValidEmailFormat(input: string): boolean {
        return StringUtils.isValidEmailFormat(input);
    }

    isValidForm(args: { fullName: string, email: string, emailConfirmation: string }): boolean {
        return this.generateValidationMessage(args) === '';
    }

    onSubmitHandler() {
        this.props.onSubmit({ email: this.state.emailInput, name: this.state.fullNameInput });
    }

    static getDerivedStateFromProps(props: any, state: RequestFormState) {
        if (props.errorMessage !== state.errorMessage) {
          return {
            errorMessage: props.errorMessage
          };
        }
        return null;
    }

    render() {
        const buttonTitle = this.props.requestStatus === RequestStatus.SENDING ? 'Sending, please wait...' : 'Send';

        return (
            <div className="registration-form-container">
                <TextInput placeholder="Full name" type="text" name="Full name" id="fullName" value={this.state.fullNameInput} handleInputChange={this.handleNameChange}></TextInput>
                <TextInput placeholder="Email" type="text" name="Email address" id="emailInput" value={this.state.fullNameInput} handleInputChange={this.handleNameChange}></TextInput>
                <TextInput placeholder="Confirm email" type="email" name="Confirm email" id="emailConfirmationInput" value={this.state.fullNameInput} handleInputChange={this.handleNameChange}></TextInput>
                <Button onclick={() => this.onSubmitHandler()}
                    disabled={ !this.isValidForm({ email: this.state.emailInput, fullName: this.state.fullNameInput, emailConfirmation: this.state.emailConfirmationInput }) || this.props.requestStatus === RequestStatus.SENDING }>
                        {buttonTitle}</Button>
                <p>{this.state.validationMessage}</p>
                <p className="error">{this.state.errorMessage}</p>
            </div>
        );
    }
}

