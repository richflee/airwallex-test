import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
require('./App.css')


interface AppComponentState {
    title: string
}
class App extends React.Component<any, AppComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: "React Boilerplate3000"
        };
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