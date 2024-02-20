import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { IRoles, getRoles } from '@/api';

export interface IRoleContext {
  roles: IRoles[];
}

export const RoleContext = createContext<IRoleContext>({ roles: [] });

export const RoleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [roles, setRoles] = useState<IRoles[]>([]);

  const fetchRoles = useCallback(async () => {
    const response = await getRoles();
    setRoles(response.data);
  }, []);

  useEffect(() => {
    fetchRoles();
  }, []);

  return <RoleContext.Provider value={{ roles }}>{children}</RoleContext.Provider>;
};

export const RoleConsumer = RoleContext.Consumer;
