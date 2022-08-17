import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/stories';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc `);

export const getOne = (storyId) => request.get(`${baseUrl}/${storyId}`);

export const create = (storyData) => request.post(baseUrl, storyData);

export const edit = (storyId, storyData) => request.put(`${baseUrl}/${storyId}`, storyData);

export const remove = (storyId) => request.del(`${baseUrl}/${storyId}`);