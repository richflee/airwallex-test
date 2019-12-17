import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TextInput from './TextInput';

describe("TextInput component", () => {
    test("Matches the snapshot", () => {
        const value = 'foo';
        const textInput = renderer.create(<TextInput  placeholder="Full name" type="text" name="Full name" id="fullName" value={value} handleInputChange={() => {return true;}} />);
        expect(textInput.toJSON()).toMatchSnapshot();
    });
});