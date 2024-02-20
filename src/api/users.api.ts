import { IUser } from './interface';

const baseUrl = 'http://localhost:3000';

export interface IApiResponse {
  message: string;
  code: number;
}

interface ListUSer extends IApiResponse {
  data: IUser[];
}

export const getUsers = async (): Promise<ListUSer> => {
  try {
    const response = await fetch(`${baseUrl}/users`);

    const data = (await response.json()) as IUser[];

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

interface IOneUserResponse extends IApiResponse {
  data: IUser | null;
}

export const getUserById = async (id: string): Promise<IOneUserResponse> => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`);

    const data = (await response.json()) as IUser;

    return await Promise.resolve({
      message: response.statusText,
      data,
      code: response.status,
    });
  } catch (error) {
    return await Promise.resolve({
      message: '',
      data: null,
      code: 0,
    });
  }
};

export const editUserById = async (id: string, body: IUser): Promise<IOneUserResponse> => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as IUser;

    return await Promise.resolve({
      message: response.statusText,
      data,
      code: response.status,
    });
  } catch (error) {
    return await Promise.resolve({
      message: '',
      data: null,
      code: 0,
    });
  }
};
