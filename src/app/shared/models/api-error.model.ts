
    export interface ValidationError {
        fieldName: string;
        message: string;
    }



    export interface ErrorAPIResponse {
        httpStatus: number;
        apiCode: string;
        userMessage: string;
        developerMessage: string;
        validationErrors: ValidationError[];
    }



