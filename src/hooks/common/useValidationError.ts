import { ApiResponse } from '@/app/models/apiResponse';
import { ValidationErrorService } from '@/app/services/validationErrorService';
import { useState } from 'react';

export const useValidationError = () => {

    const [errors, setError] = useState<any>(null);

    const showError = (response : ApiResponse) => {
        ValidationErrorService.setValidationError(response, setError);
    }

    const clearError = () => {
        setError(null);
    }

  return {errors, showError, clearError};
}
