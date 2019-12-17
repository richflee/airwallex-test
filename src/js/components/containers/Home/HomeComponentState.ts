export interface HomeComponentState {
    showingModal: boolean,
    showingRequestForm: boolean,
    showingRequestResult: boolean,
    fullNameValid: boolean,
    fullNameInput: string,
    emailInput: string,
    emailInputValid: boolean,
    emailConfirmationInput: string,
    emailConfirmationInputValid: boolean,
    validationMessage: string
}