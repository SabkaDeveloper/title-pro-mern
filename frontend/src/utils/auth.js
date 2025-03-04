export const setTokenWithExpiry = (token, user) => {
    const now = new Date();
    const item = {
      token: token,
      user: user,
      expiry: now.getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
    };
    localStorage.setItem('token', JSON.stringify(item));
  };
  
  export const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      return null;
    }
  
    try {
      const item = JSON.parse(tokenString);
      const now = new Date();
      
      if (now.getTime() > item.expiry) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        return null;
      }
      
      return item.token;
    } catch {
      return null;
    }
  };
  
  export const isAuthenticated = () => {
    return getToken() !== null;
  };
  
  export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };
  
  export const getUser = () => {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
      return null;
    }
  
    try {
      const item = JSON.parse(tokenString);
      return item.user;
    } catch {
      return null;
    }
  };