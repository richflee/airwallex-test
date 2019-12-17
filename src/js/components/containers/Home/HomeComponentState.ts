export enum RequestStatus {
    IDLE,
    SENDING
}

export interface HomeComponentState {
    errorMessage: string,
    showingModal: boolean,
    showingRegistrationForm: boolean,
    showingSuccessModal: boolean,
    requestStatus: RequestStatus
}

export interface RequestFormState {
    errorMessage: string,
    fullNameValid: boolean,
    fullNameInput: string,
    emailInput: string,
    emailInputValid: boolean,
    emailConfirmationInput: string,
    emailConfirmationInputValid: boolean,
    validationMessage: string
}