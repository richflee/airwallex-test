import * as React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: #fff;
    width: 100%;

    > div {
        padding: 1em;
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
                    <p>Made w/ love in Melbourne.</p>
                </div>
            </StyledFooter>
        );
    }
}

