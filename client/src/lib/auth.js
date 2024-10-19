const LOCAL_STORAGE_JWT_KEY = 'cfg_jwt';

/**
 * Performs an authenticated fetch request and handles unauthorized access.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [options] - The options for the fetch request.
 * @returns {Promise<any>} The parsed JSON response data.
 * @throws {Error} If the fetch request fails.
 */
export const fetchWithAuth = async (url, options) => {
  const token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY)
  if (!token) {
    throw new Error("No token found in local storage when trying to fetch an authenticated route.");
  }
  
  const headers = options?.headers || {};
  headers["Authorization"] = `Bearer ${token}`;
  options.headers = headers;
  
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + url, options);
  const data = await response.json();
  if (response.status === 401) {
    window.location.href = '/';
  }
  return data;
};
export const login = async (email, password) => {
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/client/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.status === 200) {
    localStorage.setItem(LOCAL_STORAGE_JWT_KEY, data.token);
    window.location.href = '/home'
    return true; // Login successful
  } else {
    if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error('Login failed');
    }
  }
};

export const register = async (email, password) => {
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.status === 201) {

  } else {
    if (data.error) {
      alert(data.error);
    } else {
      alert('Email already exists');
    }
  }
};

export const getDecodedToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
  if (!token) return null;
  const body = token.split('.')[1];
  const decode = JSON.parse(atob(body));
  return decode
}
