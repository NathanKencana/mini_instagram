export const userlogin = (user) => {
    console.log(user);
    return { type: 'userlogin', payload: user };
}