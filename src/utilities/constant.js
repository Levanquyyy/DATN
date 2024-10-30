export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/register`;
export const SIGNIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_DATA_PRODUCT_RENTHOUSE = `${AUTH_ROUTES}/product/get-data-product-rent`;
export const UPDATE_DATA_PRODUCT_RENTHOUSE = (id) =>
  `${AUTH_ROUTES}/update-product-rent/${id}`;

// get postingtype
export const GET_PROUCT = "api/auth/product";
export const GET_DATA_POSTINGTYPE = `${GET_PROUCT}/get-data-posting-type`;
export const GET_DATA_BY_USERID = `${HOST}/${GET_PROUCT}/get-product-rent-user-id`;

// get USER

export const GET_USER = `${HOST}/api/auth/user`;
