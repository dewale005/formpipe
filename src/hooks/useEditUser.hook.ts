import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { IUser, editUserById, getUserById } from '@/api';

interface IEditUser {
  user: IUser | null;
  loading: boolean;
  isSubmitting: boolean;
  values: Omit<IUser, 'avatar' | 'id'>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const useEditUser = (id: string): IEditUser => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { handleSubmit, handleChange, values, isSubmitting } = useFormik<IUser>({
    initialValues: {
      name: user?.name || '',
      gender: user?.gender || 'male',
      hair: user?.hair || 'black',
      eyes: user?.eyes || 'brown',
      glasses: user?.glasses || false,
      roles: user?.roles || [],
      id: user?.id || '',
      avatar: user?.avatar || '',
    },
    enableReinitialize: true,
    onSubmit: async (_values) => {
      await editUserById(user?.id as string, _values as IUser);
    },
  });

  const fetchUser = useCallback(async () => {
    const response = await getUserById(id);
    setUser(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    isSubmitting,
    loading,
    values,
    handleSubmit,
    handleChange,
  };
};

export default useEditUser;
