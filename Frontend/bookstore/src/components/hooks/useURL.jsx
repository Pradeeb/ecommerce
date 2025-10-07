const baseURL = "http://localhost:8080";

export const googleSignUp = `${baseURL}/oauth2/authorization/google`;
export const gitSignUp = `${baseURL}/oauth2/authorization/github`;
export const signup = `${baseURL}/api/signup`;


const useURL = () => {
  return { googleSignUp, gitSignUp, signup };
};

export default useURL;
