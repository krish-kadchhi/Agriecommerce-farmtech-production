// API Configuration for different environments
const getApiBaseUrl = () => {
    // Check if we're in production (deployed on Render)
    if (import.meta.env.PROD) {
      // Use production backend URL
      return import.meta.env.VITE_API_BASE_URL_PROD || 'https://your-backend-domain.onrender.com';
    }
    
    // Development environment
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  };
  
  export const API_BASE_URL = getApiBaseUrl();
  
  // API endpoints
  export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: `${API_BASE_URL}/auth/login`,
      SIGNUP: `${API_BASE_URL}/auth/signup`,
      VERIFY_OTP: `${API_BASE_URL}/auth/verifyOtp`,
      FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
      RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
      EDIT_PROFILE: `${API_BASE_URL}/auth/edit-profile`,
      ALL_USERS: `${API_BASE_URL}/auth/allusers`,
    },
      ITEMS: {
    SHOW_PRODUCTS: `${API_BASE_URL}/item/showPro`,
    ALL_PRODUCTS: `${API_BASE_URL}/item/all-products`,
    ADD_PRODUCT: `${API_BASE_URL}/item/add`,
    EDIT_PRODUCT: `${API_BASE_URL}/item/edit`,
    SEARCH_PRODUCT: `${API_BASE_URL}/item/searchProduct`,
  },
    CART: {
      SHOW_CART: `${API_BASE_URL}/cart/showCart`,
      SHOW_ITEMS: `${API_BASE_URL}/cart/showItem`,
      ADD_TO_CART: `${API_BASE_URL}/cart/addCart`,
      DELETE_FROM_CART: `${API_BASE_URL}/cart/deleteCart`,
    },
    PAYMENT: {
      CHECKOUT: `${API_BASE_URL}/payment/checkout`,
      VERIFY_PAYMENT: `${API_BASE_URL}/payment/verify-payment`,
    },
    ORDERS: {
      LATEST_ORDER: `${API_BASE_URL}/orders/latest`,
      USER_ORDERS: `${API_BASE_URL}/orders/user`,
      ALL_ORDERS: `${API_BASE_URL}/orders/all`,
    },
  };
  
  export default API_ENDPOINTS;