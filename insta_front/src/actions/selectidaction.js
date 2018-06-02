export const selectID = (id) =>{
    console.log(id);
    return { type: 'selectID', payload: id};
};