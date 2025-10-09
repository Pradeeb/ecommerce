const baseURL = "http://localhost:8080";

export const googleSignUp = `${baseURL}/oauth2/authorization/google`;
export const gitSignUp = `${baseURL}/oauth2/authorization/github`;
export const signup = `${baseURL}/api/signup`;
export const signin = `${baseURL}/api/signin`;


const useURL = () => {
  return { googleSignUp, gitSignUp, signup, signin };
};

export default useURL;
