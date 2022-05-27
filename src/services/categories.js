import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
/*
router.get('/getAllCategories', categories.getAllCategories);
router.get('/getCategoryById/:categoryId', categories.getCategoryById);
router.post('/createCategory', categories.createCategory);
router.put('/updateCategory', categories.updateCategory);
router.delete('/deleteCategory/:categoryId', categories.deleteCategory);

*/
let token ;
export const getAllCategories = async () => {
    try {
        token = localStorage.getItem("jwt");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.get("/categories/getAllCategories",{headers: {token: token}});
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
export const getCategoryById = async (categoryId) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.get(`/categories/getCategoryById/${categoryId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
export const createCategory = async (category) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.post("/categories/createCategory", {category});
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
export const updateCategory = async (category) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.put("/categories/updateCategory", {category});
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
export const deleteCategory = async (categoryId) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.delete(`/categories/deleteCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};