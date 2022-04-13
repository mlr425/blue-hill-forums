export const getLocalStorageUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user
}