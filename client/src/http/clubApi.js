import { $authHost, $host } from "./index";

export const createClub = async (club) => {
    const { data } = await $authHost.post('api/club', club);
    return data
};

export const fetchClubs = async () => {
    const { data } = await $host.get('api/club');
    return data
};

export const getClubById = async (id) => {
    try {
        const response = await $host.get(`api/club/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка при получении данных о клубе: ${error.message}`);
    }
};
