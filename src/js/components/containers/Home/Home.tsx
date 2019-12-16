import * as React from 'react';
import Header from '../Header/Header';
import Button from '../../components/Button/Button';
import Footer from '../Footer/Footer';


interface HomeComponentState {
    revealExplanatoryInfo: boolean
}

export default class Home extends React.Component<any, HomeComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            revealExplanatoryInfo: false
        } as HomeComponentState;

        this._onToggleTextDisplay = this._onToggleTextDisplay.bind(this);
    }

    _onToggleTextDisplay() {
        const reveal = !this.state.revealExplanatoryInfo;
        this.setState({
            revealExplanatoryInfo: reveal
        });
    }

    _renderExplanatoryText() {
        let explanatoryText; 
        if (this.state.revealExplanatoryInfo) {
            explanatoryText = `Welcome to my cool React boilerplate. As you can see I'm trying to jam as many useful tools into it, such as: Styled Components, Jest, Typescript and more.`;
        } else {
            explanatoryText = ``;
        }
        return <p>{explanatoryText}</p>;
    }

    _toggleMessageButtonText() {
        if (this.state.revealExplanatoryInfo) {
            return `Hide welcome message`;
        } else {
            return `Show welcome message`;
        }
    }

    render() {

        var divStyle = {
            height: '100%',
            width: '100%',
        };

        return (
            <div style={divStyle}>
                <div className="home-wrapper">
                    <Header></Header>
                    <div className="content-wrapper">
                        <h2>A better way to enjoy every day.</h2>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <p>Be the first to know when we launch.</p>
                        <Button>Request an invite</Button>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}