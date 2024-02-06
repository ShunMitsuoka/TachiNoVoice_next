export class ApiResponse {
    private statusCode: number;
    private success: boolean;
    private result: any;
    private errors: any;

    constructor(
        statusCode: number,
        success: boolean,
        result: any,
        errors: any,
    ) {
        this.statusCode = statusCode;
        this.success = success;
        this.result = result;
        this.errors = errors;
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public getSuccess(): boolean {
        return this.success;
    }

    public getResult(): any {
        return this.result;
    }

    public getErrors(): any {
        return this.errors;
    }
}