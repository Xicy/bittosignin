const clearLocalStorage = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
};

export {
    clearLocalStorage,
};
