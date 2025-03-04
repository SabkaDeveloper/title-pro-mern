// ✅ Save token and user data with expiry
export const setTokenWithExpiry = (token, user) => {
  const now = Date.now();
  const expiry = now + 24 * 60 * 60 * 1000; // 24 hours expiry

  // Store in the new format
  const authData = { token, user, expiry };
  localStorage.setItem("authData", JSON.stringify(authData));

  // Also store in old format for backward compatibility
  localStorage.setItem("token", JSON.stringify({ token, expiry }));
  localStorage.setItem("user", JSON.stringify(user));

  console.log("✅ Auth Data Stored:", authData);
};

// ✅ Get token if it's still valid
export const getToken = () => {
  // Try new format first
  const authDataString = localStorage.getItem("authData");
  if (authDataString) {
    try {
      const authData = JSON.parse(authDataString);
      const now = Date.now();

      if (now > authData.expiry) {
        console.warn("⚠️ Token expired. Clearing auth data...");
        clearAuthData();
        return null;
      }

      return authData.token;
    } catch (error) {
      console.error("❌ Error parsing token from authData:", error);
    }
  }

  // Fall back to old format
  const tokenString = localStorage.getItem("token");
  if (tokenString) {
    try {
      const { token, expiry } = JSON.parse(tokenString);
      const now = Date.now();

      if (now > expiry) {
        console.warn("⚠️ Token expired. Clearing auth data...");
        clearAuthData();
        return null;
      }

      return token;
    } catch (error) {
      console.error("❌ Error parsing token:", error);
    }
  }

  return null;
};

// ✅ Get user ID from stored data
export const getUserId = () => {
  // Try new format first
  const authDataString = localStorage.getItem("authData");
  if (authDataString) {
    try {
      const authData = JSON.parse(authDataString);
      return authData.user?.id || null;
    } catch (error) {
      console.error("❌ Error retrieving user ID from authData:", error);
    }
  }

  // Fall back to old format
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      return user.id || null;
    } catch (error) {
      console.error("❌ Error retrieving user ID:", error);
    }
  }

  return null;
};

// ✅ Get user role from stored data
export const getUserRole = () => {
  // Try new format first
  const authDataString = localStorage.getItem("authData");
  if (authDataString) {
    try {
      const authData = JSON.parse(authDataString);
      return authData.user?.role || null;
    } catch (error) {
      console.error("❌ Error retrieving user role from authData:", error);
    }
  }

  // Fall back to old format
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      return user.role || null;
    } catch (error) {
      console.error("❌ Error retrieving user role:", error);
    }
  }

  return null;
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  return getToken() !== null;
};

// ✅ Check if user is an admin
export const isAdmin = () => {
  return getUserRole() === "admin";
};

// ✅ Logout: Clear stored auth data
export const clearAuthData = () => {
  console.warn("⚠️ Logging out: Clearing auth data from local storage...");
  localStorage.removeItem("authData");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
};
