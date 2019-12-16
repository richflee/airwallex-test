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
                <div className="home-wrapper">
                    <Header style={headerStyle}></Header>
                    <div className="home-wrapper__content">
                        <h2>A better way to enjoy every day.</h2>
                        <p>Be the first to know when we launch.</p>
                        <Button>Request an invite</Button>
                    </div>
                    <Footer style={footerStyle}></Footer>
                </div>
            </div>
        );
    }
}