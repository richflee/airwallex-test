import * as React from 'react';
import styled from 'styled-components';
import * as StringUtils from '../../../utils/string.utils';
import { RequestFormState, RequestStatus } from '../Home/HomeComponentState';
import Button from '../../components/Button/Button';

const StyledRequestForm = styled.div`
    > input {
        border: 1px solid #6ba8a9;
        border-radius: 0.25em;
    }

    .error {
        color: tomato;
    }
`;

export default class RequestForm extends React.Component<any, RequestFormState> {

    constructor(props: any) {
        super(props);

        this.state = {
            fullNameValid: false,
            fullNameInput: '',
            emailInput: '',
            emailConfirmationInput: '',
            validationMessage: '',
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
            emailInputValid: !!this.isValidEmailFormat(event.target.value),
            emailInput: event.target.value,
            validationMessage: this.generateValidationMessage({ email: event.target.value, fullName: this.state.fullNameInput, emailConfirmation: this.state.emailConfirmationInput })
        });
    }

    handleEmailConfirmationChange(event: any) {
        this.setState({
            emailConfirmationInputValid: event.target.value === this.state.emailInput,
            emailConfirmationInput: event.target.value,
            validationMessage: this.generateValidationMessage({ email: this.state.emailInput, fullName: this.state.fullNameInput, emailConfirmation: event.target.value })
        });
    }

    handleNameChange(event: any) {
        this.setState({
            fullNameValid: event.target.value.length >= 3,
            fullNameInput: event.target.value,
            validationMessage: this.generateValidationMessage({ email: this.state.emailInput, fullName: event.target.value, emailConfirmation: this.state.emailConfirmationInput })
        });
    }

    isValidEmailFormat(input: string): boolean {
        return StringUtils.isValidEmailFormat(input);
    }

    onSubmitHandler() {
        this.props.onSubmit({ email: this.state.emailInput, name: this.state.fullNameInput });
    }

    render() {
        const buttonTitle = this.props.requestStatus === RequestStatus.SENDING ? 'Sending, please wait...' : 'Send';

        return (
            <StyledRequestForm>
                <input placeholder="Full name" type="text" name="" id="fullName" value={this.state.fullNameInput}
        onChange={this.handleNameChange} />
                <input placeholder="Email" type="email" name="" id="emailInput"  value={this.state.emailInput}
        onChange={this.handleEmailChange}/>
                <input placeholder="Confirm email" type="email" name="" id="emailConfirmationInput"  value={this.state.emailConfirmationInput}
        onChange={this.handleEmailConfirmationChange}/>
                <Button onclick={() => this.onSubmitHandler()} disabled={ !(this.state.validationMessage === '' && !!this.state.fullNameInput && !!this.state.emailInput && !!this.state.emailConfirmationInput) || this.props.requestStatus === RequestStatus.SENDING }>{buttonTitle}</Button>
                <p>{this.state.validationMessage}</p>
                <p className="error">{this.props.errorMessage}</p>
            </StyledRequestForm>
        );
    }
}

