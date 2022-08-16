import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/rivers';

export const getAll = () => request.get(baseUrl);

export const getOne = (riverId) => request.get(`${baseUrl}/${riverId}`);

export const create = (riverData) => request.post(baseUrl, riverData);

export const edit = (riverId, riverData) => request.put(`${baseUrl}/${riverId}`, riverData);

export const remove = (riverId) => request.del(`${baseUrl}/${riverId}`);