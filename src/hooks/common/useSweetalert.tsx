import React, { useState } from "react";
import Swal from "sweetalert2";

export const useSweetAlert = () => {

    const success = (title: string, text: string) => {
        return Swal.fire(
            title,
            text,
            'success'
        );
    }
    const error = (title: string, text: string) => {
        return Swal.fire(
            text,
            title,
            'error'
        )
    }
    const confirm = (title: string, text: string) => {
        return Swal.fire({
            title: title,
            text: text,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '処理完了',
                    '好きな言葉',
                    'success'
                )
            }
        });
    }
    const alert = (title: string) => {
        return Swal.fire({
            position: "center",
            title: title,
            showConfirmButton: false,
        });
    }
    return { success, error, confirm, alert }
}