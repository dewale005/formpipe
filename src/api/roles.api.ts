import { IRoles } from './interface';

const baseUrl = 'http://localhost:3000';

export interface IApiResponse {
  message: string;
  code: number;
}

interface ListRoles extends IApiResponse {
  data: IRoles[];
}

export const getRoles = async (): Promise<ListRoles> => {
  try {
    const response = await fetch(`${baseUrl}/roles`);

    const data = (await response.json()) as IRoles[];

    return await Promise.resolve({
      message: response.statusText,
      data,
      code: response.status,
    });
  } catch (error) {
    return await Promise.resolve({
      message: '',
      data: [],
      code: 0,
    });
  }
};
