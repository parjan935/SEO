let inactivityTimer;

export const saveTokenToLocalStorage = (Name,token) => {
    const expirationTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hrs
    // const expirationTime = Date.now() + 1 * 60 * 1000; // 1 min
    localStorage.setItem(Name, token);
    localStorage.setItem("tokenExpiration", expirationTime);
    resetInactivityTimer(Name);
};

export const clearInactivityTimer = () => {
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
};

export const resetInactivityTimer = (Name) => {
    clearInactivityTimer();

    inactivityTimer = setTimeout(() => {
        localStorage.removeItem(Name);
        localStorage.removeItem("tokenExpiration");
        console.log("Token has been removed due to inactivity.");
    }, 2*60 * 60 * 1000);
};

export const handleUserActivity = () => {
    resetInactivityTimer();
};

export const logout = (Name) => {
    localStorage.removeItem(Name);
    localStorage.removeItem("tokenExpiration");
    clearInactivityTimer();
};
