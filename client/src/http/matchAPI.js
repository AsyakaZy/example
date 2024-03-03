import { $authHost, $host } from "./index";

export const createMatch = async (match) => {
    try {
        const { data } = await $authHost.post('api/match', match);
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchMatches = async () => {
    try {
        const { data } = await $host.get('api/match');
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchCities = async () => {
    try {
        const { data } = await $host.get('api/city');
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchClubs = async () => {
    try {
        const { data } = await $host.get('api/club');
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

export const fetchOneMatches = async () => {
    try {
        const { data } = await $host.get('api/match');
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchMatchById = async (matchId) => {
    try {
        const { data } = await $host.get(`api/match/${matchId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateMatch = async (matchData) => {
    try {
        const { data } = await $authHost.put(`api/match/${matchData.id}`, matchData);
        return data;
    } catch (error) {
        throw error;
    }
};


export const deleteMatchById = async (matchId) => {
    try {
        const { data } = await $authHost.delete(`api/match/${matchId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

