import * as React from 'react';
import Header from '../Header/Header';
import Button from '../../components/Button/Button';
import Footer from '../Footer/Footer';
import RequestForm from '../RequestForm/RequestForm';
import { HomeComponentState, RequestStatus } from './HomeComponentState';
import * as HttpService from '../../../utils/httpService.utils';

export default class Home extends React.Component<any, HomeComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showingModal: false,
            showingRequestForm: false,
            showingRequestResult: false,
            requestStatus: RequestStatus.IDLE,
            errorMessage: ''
        } as HomeComponentState;

        this.showRequestModal = this.showRequestModal.bind(this);
        this.sendRegistrationRequest = this.sendRegistrationRequest.bind(this);
        this.resetModalState = this.resetModalState.bind(this);
    }

    showRequestModal() {
        this.setState({
            showingModal: true,
            showingRequestForm: true
        });
    }

    showRequestResult(): void {
        this.setState({
            requestStatus: RequestStatus.IDLE,
            showingRequestForm: false,
            showingRequestResult: true
        });
    }

    resetModalState(): void {
        this.setState({
            showingRequestForm: false,
            showingRequestResult: false,
            showingModal: false
        });
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
            this.showRequestResult();
        }
    }

    renderModal() {
        if (this.state.showingModal && this.state.showingRequestForm) {
            return (<div className="modal">
                <div>
                    <div className="header-container">
                        <h3>Request an invite</h3>
                        <button onClick={this.resetModalState}>X</button>
                    </div>
                    <RequestForm errorMessage={this.state.errorMessage} onSubmit={this.sendRegistrationRequest} requestStatus={this.state.requestStatus}></RequestForm>
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
        return (
            <div className="home-component-wrapper">
                {this.renderModal()}
                <div className="home-component">
                    <Header className="home-component__header"></Header>
                    <div className="home-component__content">
                        <h2>A better way to enjoy every day.</h2>
                        <p>Be the first to know when we launch.</p>
                        <Button onclick={this.showRequestModal}>Request an invite</Button>
                    </div>
                    <Footer className="home-component__footer"></Footer>
                </div>
            </div>
        );
    }
}