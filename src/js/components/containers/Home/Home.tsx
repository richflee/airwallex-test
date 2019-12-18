import * as React from 'react';
import Header from '../Header/Header';
import Button from '../../components/Button/Button';
import Footer from '../Footer/Footer';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { HomeComponentState, RequestStatus } from '../../../models/HomeComponentState';
import * as HttpService from '../../../utils/httpService.utils';
require('./Home.css');

export default class Home extends React.Component<any, HomeComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showingModal: false,
            showingRegistrationForm: false,
            showingSuccessModal: false,
            requestStatus: RequestStatus.IDLE,
            errorMessage: ''
        } as HomeComponentState;

        this.showRequestModal = this.showRequestModal.bind(this);
        this.sendRegistrationRequest = this.sendRegistrationRequest.bind(this);
        this.resetModalState = this.resetModalState.bind(this);
        this.resetErrorMessage = this.resetErrorMessage.bind(this);
    }

    showRequestModal() {
        this.setState({
            showingModal: true,
            showingRegistrationForm: true
        });
    }

    showSuccessModal(): void {
        this.setState({
            requestStatus: RequestStatus.IDLE,
            showingRegistrationForm: false,
            showingSuccessModal: true
        });
    }

    resetModalState(): void {
        this.setState({
            showingRegistrationForm: false,
            showingSuccessModal: false,
            showingModal: false
        });
    }

    resetErrorMessage(): void {
        if (this.state.errorMessage) {
            this.setState({
                errorMessage: ''
            });
        }
    }

    async sendRegistrationRequest(args: { email: string, name: string }) {
        this.setState({
            requestStatus: RequestStatus.SENDING
        });
        const data = await HttpService.postRegistrationRequest({ "name": args.name, "email": args.email });

        if (data && data['errorMessage']) {
            this.setState({
                errorMessage: data['errorMessage'],
                requestStatus: RequestStatus.IDLE
            });
        } else {
            this.showSuccessModal();
        }
    }

    renderModal() {
        if (this.state.showingModal && this.state.showingRegistrationForm) {
            return (<div className="modal registration-modal">
                <div>
                    <div className="header-container">
                        <h3>Request an invite</h3>
                        <Button className="header-container__close-btn" onClick={this.resetModalState}>X</Button>
                    </div>
                    <RegistrationForm errorMessage={this.state.errorMessage}
                        onInputEdit={this.resetErrorMessage}
                        onSubmit={this.sendRegistrationRequest}
                        requestStatus={this.state.requestStatus}></RegistrationForm>
                </div>
            </div>);
        } 
        else if (this.state.showingModal && this.state.showingSuccessModal) {
            return (<div className="modal">
                <div>
                    <h3>All done!</h3>
                    <p>You will be one of the first to experience Broccoli & Co. when we launch</p>
                    <Button onClick={this.resetModalState}>OK</Button>
                </div>
            </div>);
        }
        else {
            return '';
        }
    }

    render() {
        return (
            <div className="home-component-wrapper">
                {this.renderModal()}
                <div className="home-component">
                    <Header className="home-component__header"></Header>
                    <div className="home-component__content">
                        <h2>A better way to enjoy every day.</h2>
                        <p>Be the first to know when we launch.</p>
                        <Button className="home-component__request-btn"
                            onClick={this.showRequestModal}>Request an invite</Button>
                    </div>
                    <Footer className="home-component__footer"></Footer>
                </div>
            </div>
        );
    }
}