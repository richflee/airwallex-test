import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
require('./App.scss');


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    render() {
        var divStyle = {
            height: '100%',
            width: '100%',
        };
        return (
            <Router>
                <div style={divStyle}>
                    <Route exact path="/" component={Home} />
                </div>
            </Router>
        );
    }
}


export default App;