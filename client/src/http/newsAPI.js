import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';

export const createNews = async (news) => {
    const { data } = await $authHost.post('api/news', news);
    return data
};

export const fetchNews = async () => {
    const { data } = await $host.get('api/news');
    return data
};

export const fetchOneNews = async (id) => {
    const { data } = await $host.get('api/news/' + id);
    return data
};

export const changeNews = async (id, updatedNewsData) => {
    const { data } = await $host.put(`api/news/${id}`, updatedNewsData);
    return data;
};

export const deleteNews = async (id) => {
    try {
        // Отправляем запрос DELETE на сервер с указанием ID новости в URL
        const response = await $authHost.delete(`api/news/${id}`);
        return response.data; // Возвращаем данные из ответа сервера
    } catch (error) {
        throw error; // Перехватываем исключение и выбрасываем его дальше для обработки
    }
};






