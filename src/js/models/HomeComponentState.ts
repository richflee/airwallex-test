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
