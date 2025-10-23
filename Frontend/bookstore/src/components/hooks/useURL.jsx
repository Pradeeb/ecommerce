const baseURL = "http://localhost:8080";

//Auth URL
export const googleSignUp = `${baseURL}/oauth2/authorization/google`;
export const gitSignUp = `${baseURL}/oauth2/authorization/github`;
export const signup = `${baseURL}/api/auth/signup`;
export const signin = `${baseURL}/api/auth/signin`;
export const getUser = `${baseURL}/api/auth/user`;

//Product URL
export const getAllProduct = `${baseURL}/api/product/getall`;

const useURL = () => {
  return { googleSignUp, gitSignUp, signup, signin, getUser, getAllProduct };
};

export default useURL;
