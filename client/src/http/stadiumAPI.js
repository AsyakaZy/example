import { $authHost, $host } from "./index";

export const createStadium = async (stadium) => {
    try {
        const { data } = await $authHost.post('api/stadium', stadium);
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchStadiums = async () => {
    try {
        const { data } = await $host.get('api/stadium');
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchOneStadium = async (id) => {
    try {
        const { data } = await $host.get(`api/stadium/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const changeStadium = async (id, updatedStadiumData) => {
    try {
        const { data } = await $host.put(`api/stadium/${id}`, updatedStadiumData);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteStadium = async (id) => {
    try {
        const response = await $authHost.delete(`api/stadium/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
