import * as React from 'react';
import { shallow, configure, mount } from 'enzyme';
import RegistrationForm from './RegistrationForm';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })   

describe('RegistrationForm component', () => {

    describe('Submit button', () => {
        test('the submit button is disabled by default', () => {
            const wrapper = shallow(<RegistrationForm />);
            const btn = wrapper.find('.registration-form-container__submit-btn');
            expect(btn.props().disabled).toBe(true);
        });

        test('it triggers function call to "onSubmitHandler"', () => {
            let fn: () => void = () => undefined;
            const props = {
                errorMessage: '',
                onInputEdit: fn,
                onSubmit: fn,
                requestStatus: 0
            };
            const fnSpy = jest.spyOn(RegistrationForm.prototype, 'onSubmitHandler');
            const wrapper = shallow(<RegistrationForm {...props} />);
            wrapper.find('.registration-form-container__submit-btn').last().simulate('click');
            wrapper.update();
            expect(fnSpy).toHaveBeenCalled();
        });
    });

    describe('generateValidationMessage', () => {
        test('it returns name error message for invalid name length', () => {
            const wrapper = shallow(<RegistrationForm />);
            const input = { fullName: 'fo', email: '', emailConfirmation: '' };
            const result = (wrapper.instance() as RegistrationForm).generateValidationMessage(input);
            expect(result).toBe('Full name must be at least 3 characters in length.');
        });

        test('it returns email error message for blank email', () => {
            const wrapper = shallow(<RegistrationForm />);
            const input = { fullName: 'foo', email: '', emailConfirmation: '' };
            const result = (wrapper.instance() as RegistrationForm).generateValidationMessage(input);
            expect(result).toBe('Please provide your email address.');
        });

        test('it returns invalid email error message for invalid email', () => {
            const wrapper = shallow(<RegistrationForm />);
            const input = { fullName: 'foo', email: 'foo', emailConfirmation: '' };
            const result = (wrapper.instance() as RegistrationForm).generateValidationMessage(input);
            expect(result).toBe('Please provide a valid email address.');
        });
    });
    
    test('it displays the correct text inputs and button', () => {
        const wrapper = shallow(<RegistrationForm />);
        const nameInput = wrapper.find('#fullName');
        const emailInput = wrapper.find('#emailInput');
        const emailConfirmationInput = wrapper.find('#emailConfirmationInput');
        const submitBtn = wrapper.find('.registration-form-container__submit-btn');

        expect(nameInput).toHaveLength(1);
        expect(emailInput).toHaveLength(1);
        expect(emailConfirmationInput).toHaveLength(1);
        expect(submitBtn).toHaveLength(1);
    });
});