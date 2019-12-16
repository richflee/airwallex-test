import * as React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    flex: 0 0 auto;
    background-color: #fff;
    width: 100%;

    > div {
        padding: 1em;

        h1 {
            margin: 0;
        }
    }
`;


interface HeaderComponentState {
    revealExplanatoryInfo: boolean
}

export default class Header extends React.Component<any, HeaderComponentState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <StyledHeader>
                <div>
                    <h1>Broccoli & Co.</h1>
                </div>
            </StyledHeader>
        );
    }
}

