import { UsersJson,UserItem } from "interface";

export function getUsers(token: string): Promise<UsersJson> {
    return fetch("https://sw-project-backend-one.vercel.app/api/v1/auth/users/", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
}

export function banUser(token: string,userId:string): Promise<UserItem> {
    return fetch(`https://sw-project-backend-one.vercel.app/api/v1/auth/users/${userId}/ban`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
        return response.ok ? response.json() : Promise.reject(response);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
}

export function unbanUser(token: string,userId:string): Promise<UserItem> {
    return fetch(`https://sw-project-backend-one.vercel.app/api/v1/auth/users/${userId}/unban`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
        return response.ok ? response.json() : Promise.reject(response);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
}
