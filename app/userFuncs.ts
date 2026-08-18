interface User extends Object {
    // TODO: idk what type is id
    id: any,
    username: string,
    email: string
}

export const setUser = (user: User) => {
    localStorage.setItem("DL_USER_ID", user.id);
    localStorage.setItem("DL_USER_USERNAME", user.username);
    localStorage.setItem("DL_USER_EMAIL", user.email);
}

export const deleteUser = (user: User) => {
    localStorage.setItem("DL_USER_ID", "NO_INFO");
    localStorage.setItem("DL_USER_USERNAME", "NO_INFO");
    localStorage.setItem("DL_USER_EMAIL", "NO_INFO");
}