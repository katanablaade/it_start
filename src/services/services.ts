import { Seminar } from '../types';

type Resource = {
  url: string;
  method: string;
  body?: string;
};
const services = () => {
  const getResource = async ({ url, method, body }: Resource) => {
    let config: RequestInit = {};

    if (body) {
      config.body = body;
    }

    let res = await fetch(url, {
      method,
      ...config,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  const getSeminars = () => {
    return getResource({
      url: 'http://localhost:3000/seminars',
      method: 'GET',
    });
  };
  const deleteSeminars = (id: number) => {
    return getResource({
      url: `http://localhost:3000/seminars/${id}`,
      method: 'DELETE',
    });
  };

  const putSeminar = ({ id, title, description, time }: Seminar) => {
    return getResource({
      url: `http://localhost:3000/seminars/${id}`,
      method: 'PUT',
      body: JSON.stringify({ title, description, time }),
    });
  };

  return {
    getSeminars,
    deleteSeminars,
    putSeminar,
  };
};

export default services;
