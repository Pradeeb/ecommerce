const baseURL = "http://localhost:8080";

export const googleSignUp = `${baseURL}/oauth2/authorization/google`;
export const gitSignUp = `${baseURL}/oauth2/authorization/github`;
export const signup = `${baseURL}/api/auth/signup`;
export const signin = `${baseURL}/api/auth/signin`;
export const getUser = `${baseURL}/api/auth/user`;


const useURL = () => {
  return { googleSignUp, gitSignUp, signup, signin, getUser };
};

export default useURL;
