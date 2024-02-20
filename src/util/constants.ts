import { options } from '@/api';

export const hairColorOptions: options[] = [
  {
    value: 'black',
    label: 'Black',
  },
  {
    value: 'brown',
    label: 'Brown',
  },
  {
    value: 'blonde',
    label: 'Blonde',
  },
  {
    value: 'red',
    label: 'Red',
  },
  {
    value: 'grey',
    label: 'Grey',
  },
];

export const eyeColour: options[] = [
  {
    label: 'Brown',
    value: 'brown',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Grey',
    value: 'grey',
  },
];

export const gender: options[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

export const glasses: options[] = [
  {
    value: true,
    label: 'Glasses',
  },
  {
    value: false,
    label: 'No Glasses',
  },
];
