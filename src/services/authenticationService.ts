import axios from "axios";

const apiURL:string = process.env.REACT_APP_API_URL as string
const email:string = process.env.REACT_APP_API_USER as string
const password:string = process.env.REACT_APP_API_PASSWORD as string

// Objet contenant l'email et le mot de passe pour la génération du token
const forgeTokenBody = {password, email}
const loginApi = `${apiURL}/auth/login`
// clé pour stocker dans local storage le token généré
const SESSION_STORAGE_TOKEN_KEY = "token"

// fonction qui prend aucun argument et renvoie une promesse qui retourne aucune valeur 
// promise : sert à gérer les opérations asynchrones liées à l'envoi de la requête HTTP et à la réception de la réponse
const forgeToken: () => Promise<void> = () => {
    // retourne une requete HTTP POST à l'url de connexion (loginApi) via Axios. 
    // Le corp de la requete est spécifié par l'objet forgeTokenBody qui contient les info nécéssaire à la connexion
    return axios.post(loginApi, forgeTokenBody)
        // Si la requete HTTP est réussie, le then s'execute
        .then((response) =>{
            console.log(response);
            // accessToken qui est contenu dans la réponse est extrait et stocké dans sessionStorage sous la clé SESSION_STORAGE_TOKEN_KEY
            sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY , response.data.accessToken)
        })
        // retourne le message d'erreur 
        .catch(console.error)

}

// Fonction qui récupère le token stocké dans sessionStorage 
const getToken: () =>string=()=>sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY ) as string

export {forgeToken, getToken}