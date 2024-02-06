import { SetStateAction } from "react";
import { ApiResponse } from "../models/apiResponse";

export class ValidationErrorService{
    static setValidationError(response :ApiResponse, setValidationError : (value: SetStateAction<any>) => void ){
        if(response.getStatusCode() != 422){
            return;
        }
        const errors = response.getErrors();
        let errorMsgs:any = {};
        for (const key in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, key)) {
                const error = errors[key];
                errorMsgs[key] = error;
            }
        }
        setValidationError(errorMsgs);
    }
}