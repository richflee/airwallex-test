import * as React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: #fff;
    width: 100%;

    > div {
        padding: 1em;

        h1 {
            margin: 0;
        }
    }
`;


interface FooterComponentState {
    test: boolean
}

export default class Footer extends React.Component<any, FooterComponentState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <StyledFooter>
                <div>
                    <div>Made w/ love in Melbourne.</div>
                </div>
            </StyledFooter>
        );
    }
}

