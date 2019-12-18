import * as React from 'react';
import { shallow, configure } from 'enzyme';
import RegistrationForm from './RegistrationForm';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })   

describe('RegistrationForm component', () => {
    test('the submit button is disabled by default', () => {
        const wrapper = shallow(<RegistrationForm />);
        const btn = wrapper.find('.registration-form-container__submit-btn');
        expect(btn.props().disabled).toBe(true);
    });
});