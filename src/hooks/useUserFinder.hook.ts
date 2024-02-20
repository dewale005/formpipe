import { useCallback, useEffect, useState } from 'react';
import { IUser, getUsers } from '@/api';
import { chunk, sortData } from '@/util';

interface IUserFinder {
  users: IUser[];
  isLoading: boolean;
  activePage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  reverseSortDirection: boolean;
  sorting: (field: keyof Omit<IUser, 'roles' | 'glasses'>) => void;
  sortedBy: keyof Omit<IUser, 'roles' | 'glasses'> | null;
  query: string;
  search: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFIlter: (field: keyof IUser, value: string) => void;
}

const useUserFinder = (): IUserFinder => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filterUser, setfilter] = useState<IUser | null>(null);
  const [activePage, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<IUser[]>([]);
  const [sortBy, setSortBy] = useState<keyof Omit<IUser, 'roles' | 'glasses'> | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    const { data } = await getUsers();
    setUsers(data);
    setSortedData(data);
    setIsLoading(false);
  }, [sortData]);

  const sorting = useCallback(
    (field: keyof Omit<IUser, 'roles' | 'glasses'>) => {
      const reversed = field === sortBy ? !reverseSortDirection : false;
      setReverseSortDirection(reversed);
      setSortBy(field);
      setSortedData(sortData(users, { sortBy: field, reversed, search }) as IUser[]);
    },
    [users, sortData, sortBy, reverseSortDirection]
  );

  const handleSorted = (filteredData: IUser[]) => {
    if (filterUser) {
      const filterOpt = Object.entries(filterUser).filter((ele) => ele[1] !== '');
      if (filterOpt.length > 0) {
        return filteredData.filter(
          (ele) =>
            (filterUser.eyes === undefined ||
              filterUser.eyes?.length < 1 ||
              ele.eyes === filterUser.eyes) &&
            (filterUser.hair === undefined ||
              filterUser.hair?.length < 1 ||
              ele.hair === filterUser.hair) &&
            (filterUser.gender === undefined ||
              filterUser.gender?.length < 1 ||
              ele.gender === filterUser.gender) &&
            (filterUser.glasses === undefined || ele.glasses === filterUser.glasses)
        );
      }
      return filteredData;
    }
    return filteredData;
  };

  const data = chunk(handleSorted(sortedData), 5);

  const handleFIlter = (field: keyof IUser, value: string) => {
    setfilter({ ...filterUser, [field as keyof IUser]: value });
  };

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      setSearch(value);
      setSortedData(
        sortData(users, { sortBy, reversed: reverseSortDirection, search: value }) as IUser[]
      );
    },
    [users, sortData]
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users: data[activePage - 1] || [],
    isLoading,
    setPage,
    sortedBy: sortBy,
    activePage,
    totalPages: data.length,
    sorting,
    handleFIlter,
    reverseSortDirection,
    query: search,
    search: handleSearchChange,
  };
};

export default useUserFinder;
