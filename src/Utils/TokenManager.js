export const getAccessToken = ()=>{
    return localStorage.getItem('accessToken');
}
export const clearTokens = () =>{
    localStorage.clear('accessToken');
    localStorage.clear('user');

}
