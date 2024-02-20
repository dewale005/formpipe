import { IUser } from '@/api';

export function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length || array.length === 0) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

export function filterData(data: Omit<IUser, 'roles' | 'glasses'>[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => item.name.toLowerCase().includes(query));
}

export function filters(data: Omit<IUser, 'roles' | 'glasses'>[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => item.name.toLowerCase().includes(query));
}

// export function filter(data: IUser[], filters: {hair: string}) {}

export function sortData(
  data: Omit<IUser, 'role' | 'glasses'>[],
  payload: {
    sortBy: keyof Omit<IUser, 'roles' | 'glasses'> | null;
    reversed: boolean;
    search: string;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}
