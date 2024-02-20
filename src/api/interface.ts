export interface IUser {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male' | '';
  hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey' | '';
  eyes: 'brown' | 'blue' | 'green' | '';
  glasses: boolean | string;
  roles: string[];
}

export interface IRoles {
  id: string;
  name: string;
  description: string;
}

export interface options {
  value: string | number | boolean;
  label: string | number;
}
