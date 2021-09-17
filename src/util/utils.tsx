import React from "react";


export function checkTokenValidation(response:any){
    if (response.status === 401 || response.status === 403) {
        localStorage.setItem("logoutMessage", "Oturum süresi doldu veya kullanıcı onayında hata oluştu.")
        localStorage.removeItem("token");
        window.location.href = "/";
    }
}