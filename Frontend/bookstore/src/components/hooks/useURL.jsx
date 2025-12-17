const baseURL = "http://localhost:8080";

// Auth URLs
export const googleSignUp = `${baseURL}/oauth2/authorization/google`;
export const gitSignUp = `${baseURL}/oauth2/authorization/github`;
export const signup = `${baseURL}/api/auth/signup`;
export const signin = `${baseURL}/api/auth/signin`;
export const getUser = `${baseURL}/api/auth/user`;
export const greeting = `${baseURL}/greeting`;

// Product URLs
export const getAllProduct = `${baseURL}/api/product/getall`;
export const getAllCategory = `${baseURL}/api/product/getcategory`;
export const getSingleProduct=  `${baseURL}/api/product/id`;
export const getCategoryProduct=  `${baseURL}/api/product/category`;

export default function useURL() {
  return {
    googleSignUp,
    gitSignUp,
    signup,
    signin,
    getUser,
    getAllProduct,
    getAllCategory,
    greeting,
    getSingleProduct,
    getCategoryProduct,
  };
}
