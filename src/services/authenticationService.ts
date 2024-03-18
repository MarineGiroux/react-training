import axios from "axios";

const apiURL:string = process.env.REACT_APP_API_URL as string
const email:string = process.env.REACT_APP_API_USER as string
const password:string = process.env.REACT_APP_API_PASSWORD as string

const forgeTokenBody = {password, email}
const loginApi = `${apiURL}/auth/login`
const SESSION_STORAGE_TOKEN_KEY = "token"

const forgeToken: () => Promise<void> = () => {
    return axios.post(loginApi, forgeTokenBody)
        .then((response) =>{
            console.log(response);
            sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY , response.data.accessToken)
        })
        .catch(console.error)

}

const getToken: () =>string=()=>sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY ) as string

export {forgeToken, getToken}