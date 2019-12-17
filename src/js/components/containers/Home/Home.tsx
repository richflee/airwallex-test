import * as React from 'react';
import Header from '../Header/Header';
import Button from '../../components/Button/Button';
import Footer from '../Footer/Footer';
import * as StringUtils from '../../../utils/string.utils';
import { HomeComponentState } from './HomeComponentState';


export default class Home extends React.Component<any, HomeComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showingModal: false,
            showingRequestForm: false,
            showingRequestResult: false,
            fullNameValid: false,
            fullNameInput: '',
            emailInput: '',
            emailConfirmationInput: '',
            validationMessage: ''
        } as HomeComponentState;

        this.showRequestModal = this.showRequestModal.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailConfirmationChange = this.handleEmailConfirmationChange.bind(this);
        this.send = this.send.bind(this);
        this.resetModalState = this.resetModalState.bind(this);
        this.generateValidationMessage = this.generateValidationMessage.bind(this);
    }

    showRequestModal() {
        this.setState({
            showingModal: true,
            showingRequestForm: true
        });
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

    showRequestResult(): void {
        this.setState({
            showingRequestForm: false,
            showingRequestResult: true
        });
    }

    resetModalState(): void {
        this.setState({
            showingRequestForm: false,
            showingRequestResult: false,
            showingModal: false,
            emailInput: '',
            emailConfirmationInput: '',
            fullNameInput: '',
            fullNameValid: false,
            emailInputValid: false,
            emailConfirmationInputValid: false,
            validationMessage: ''
        });
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

    async postData(url = '', data = {}): Promise<any> {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    async send() {
        console.log('TRYING'); // JSON-string from `response.json()` call
        try {
            const data = await this.postData('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', { "name": "XXX", "email": "XXX" });
            console.log('RESPONSE', JSON.stringify(data)); // JSON-string from `response.json()` call
            this.showRequestResult();
        } catch (error) {
            console.error(error);
        }
    }

    renderModal() {
        if (this.state.showingModal && this.state.showingRequestForm) {
            return (<div className="modal">
                <div>
                    <h3>Request an invite</h3>
                    <button onClick={this.resetModalState}>X</button>
                    <input placeholder="Full name" type="text" name="" id="fullName" value={this.state.fullNameInput}
          onChange={this.handleNameChange} />
                    <input placeholder="Email" type="email" name="" id="emailInput"  value={this.state.emailInput}
          onChange={this.handleEmailChange}/>
                    <input placeholder="Confirm email" type="email" name="" id="emailConfirmationInput"  value={this.state.emailConfirmationInput}
          onChange={this.handleEmailConfirmationChange}/>
                    <p>{this.state.validationMessage}</p>
                    <Button onclick={this.send} disabled={ !(this.state.validationMessage === '' && !!this.state.fullNameInput && !!this.state.emailInput && !!this.state.emailConfirmationInput) }>Send</Button>
                </div>
            </div>);
        } 
        else if (this.state.showingModal && this.state.showingRequestResult) {
            return (<div className="modal">
                <div>
                    <h3>All done!</h3>
                    <p>You will be one of the first to experience Broccoli & Co. when we launch</p>
                    <Button onclick={this.resetModalState}>OK</Button>
                </div>
            </div>);
        }
        else {
            return '';
        }
    }

    render() {

        var divStyle = {
            height: '100%',
            width: '100%',
        };

        var headerStyle = {
            flex: '0 0 auto'
        };

        var footerStyle = {
            flex: '0 0 auto'
        };

        return (
            <div style={divStyle}>
                {this.renderModal()}
                <div className="home-wrapper">
                    <Header style={headerStyle}></Header>
                    <div className="home-wrapper__content">
                        <h2>A better way to enjoy every day.</h2>
                        <p>Be the first to know when we launch.</p>
                        <Button onclick={this.showRequestModal}>Request an invite</Button>
                    </div>
                    <Footer style={footerStyle}></Footer>
                </div>
            </div>
        );
    }
}