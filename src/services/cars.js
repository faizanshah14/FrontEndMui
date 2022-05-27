import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/api";

axios.defaults.headers.post["Content-Type"] = "application/json";
/*
router.get('/getAllCars', cars.getAllCars);
router.get('/getCarById/:carId', cars.getCarById);
router.post('/createCar', cars.createCar);
router.put('/updateCar', cars.updateCar);
router.delete('/deleteCar/:carId', cars.deleteCar);
*/
export const getAllCars = async () => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
        const response = await axios.get("/cars/getAllCars");
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
export const getCarById = async (carId) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
        const response = await axios.get(`/cars/getCarById/${carId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
export const createCar = async (car) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
        const response = await axios.post("/cars/createCar", car);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
export const updateCar = async (car) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
        const response = await axios.put("/cars/updateCar", car);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
export const deleteCar = async (carId) => {
    try {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("jwt");
        const response = await axios.delete(`/cars/deleteCar${carId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}