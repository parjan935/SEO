let inactivityTimer;

export const saveTokenToLocalStorage = (Name,token) => {
    const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hrs
    // const expirationTime = Date.now() + 1 * 60 * 1000; // 1 min
    localStorage.setItem(Name, token);
    localStorage.setItem("tokenExpiration", expirationTime);
    resetInactivityTimer();
};

export const clearInactivityTimer = () => {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
};

export const resetInactivityTimer = () => {
    clearInactivityTimer();

    inactivityTimer = setTimeout(() => {
        localStorage.removeItem("Token");
        localStorage.removeItem("tokenExpiration");
        console.log("Token has been removed due to inactivity.");
    }, 2*60 * 60 * 1000);
};

export const handleUserActivity = () => {
    resetInactivityTimer();
};

export const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("tokenExpiration");
    clearInactivityTimer();
};
