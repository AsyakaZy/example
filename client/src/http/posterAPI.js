import { $authHost, $host } from "./index";

export const createPoster = async (poster) => {
    const { data } = await $authHost.post('api/poster', poster);
    return data
};

export const fetchPosters = async () => {
    const { data } = await $host.get('api/poster');
    return data
};

export const fetchClubs = async () => {
    try {
        const { data } = await $authHost.get('api/club');
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchPlayers = async () => {
    try {
        const { data } = await $authHost.get('api/players');
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchStadiums = async () => {
    try {
        const { data } = await $authHost.get('api/stadium');
        return data;
    } catch (error) {
        throw error;
    }
};

export const deletePoster = async (id) => {
    try {
        const { data } = await $authHost.delete(`api/poster/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};
