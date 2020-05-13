
export const isAuthenticated = () => localStorage.getItem('userId') !== null;
export const getToken = () => localStorage.getItem('userId');
