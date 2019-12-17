import * as React from 'react';
import styled from 'styled-components';

const StyledTextInput = styled.input`
    border: 1px solid #6ba8a9;
    border-radius: 0.25em;
`;

export default class TextInput extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <StyledTextInput
                placeholder={this.props.placeholder}
                type={this.props.type}
                name={this.props.name}
                id={this.props.id}
                value={this.props.value}
                onChange={this.props.handleInputChange} />
        );
    }
}
