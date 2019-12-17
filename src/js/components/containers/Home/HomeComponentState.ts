export enum RequestStatus {
    IDLE,
    SENDING
}

export interface HomeComponentState {
    errorMessage: string,
    showingModal: boolean,
    showingRequestForm: boolean,
    showingRequestResult: boolean,
    requestStatus: RequestStatus
}

export interface RequestFormState {
    fullNameValid: boolean,
    fullNameInput: string,
    emailInput: string,
    emailInputValid: boolean,
    emailConfirmationInput: string,
    emailConfirmationInputValid: boolean,
    validationMessage: string
}