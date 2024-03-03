import { $authHost, $host } from "./index";

export const createCity = async (city) => {
    const { data } = await $authHost.post('api/city', club);
    return data
};

export const fetchCities = async () => {
    const { data } = await $host.get('api/city');
    return data
};

export const getCityById = async (id) => {
    try {
        const response = await $host.get(`api/city/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при получении данных о клубе: ${error.message}`);
    }
};
