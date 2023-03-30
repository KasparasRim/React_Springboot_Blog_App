import HTTP from "./"
import { useMutation } from "react-query";

const createUserJson = (user) => HTTP.post(`/auth/register`, { ...user, name: user.email }).then(response =>
    new Promise((resolve) => {
        resolve(response.data)
    }))

const useCreateUser = (config) => {
    const mutation = useMutation(createUserJson, config)
    return mutation.mutateAsync
}

const login = (loginRequest) => HTTP.post(`/auth/login`, loginRequest)
    .then(({ data }) => data)

const useLogin = (config) => {
    const mutation = useMutation(login, config)
    return mutation.mutateAsync
}


export { useCreateUser, useLogin }