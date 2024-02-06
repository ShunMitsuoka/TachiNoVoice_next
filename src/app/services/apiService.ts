import { ApiResponse } from "../models/apiResponse";
import axios from "axios";
import { Session } from "next-auth";
import { AuthService } from "./authService";
import { resolve } from "path";

export class ApiService {
    static getFullURL(url: string, ssFlg: boolean = false) {
        url = url.replace(/^\//, '');
        if (ssFlg) {
            return process.env.API_CONTAINER_URL + url;
        } else {
            return process.env.NEXT_PUBLIC_API_URL + url;
        }
    }

    static async getCSRF(ssFlg: boolean = false) {
        return new Promise((resolve) => {
            axios
                .get(ApiService.getFullURL('/sanctum/csrf-cookie', ssFlg))
                .then((res) => {
                    resolve(res);
                });
        })
    }

    static getAuthHeader(session: Session | null) {
        const token = AuthService.getAccessToken(session);
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        return headers;
    }

    static makeApiResponse(response: any): ApiResponse {
        return new ApiResponse(
            response.status,
            response.data.success,
            response.data.result,
            response.data.errors,
        );
    }

    static makeApiErrorResponse(error: any): ApiResponse {
        return new ApiResponse(
            error.response.status,
            error.response.data.success,
            error.response.data.result,
            error.response.data.errors,
        );
    }

    static setConfig(key: string, data: any, config: any = {}) {
        config[key] = data;
        return config;
    }
}
