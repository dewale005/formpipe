/* eslint-disable import/extensions */
import {
  Avatar,
  Button,
  Group,
  Pagination,
  Skeleton,
  Table as TableElement,
  Text,
  rem,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React from 'react';
import { IUser } from '@/api';

// Table Header
const TableHead = React.forwardRef<
  React.ElementRef<typeof TableElement.Thead>,
  React.ComponentPropsWithoutRef<typeof TableElement.Thead> &
    Partial<{
      data: string[];
      reversed: boolean;
      sortedBy: keyof Omit<IUser, 'roles' | 'glasses'> | null;
      onSort:(field: keyof Omit<IUser, 'roles' | 'glasses'>) => void;
    }>
>(({ data, reversed, sortedBy, onSort, ...props }, ref) => (
  <TableElement.Thead {...props} ref={ref}>
    <TableElement.Tr>
      {data?.map((element, index) => {
        const Icon =
          sortedBy === element.toLocaleLowerCase()
            ? reversed
              ? IconChevronUp
              : IconChevronDown
            : IconSelector;
        return (
          <TableElement.Th key={index}>
            <Button
              justify="flex-start"
              onClick={() =>
                onSort?.(element.toLocaleLowerCase() as keyof Omit<IUser, 'roles' | 'glasses'>)
              }
              fullWidth
              color="dark"
              variant="white"
              leftSection={<Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            >
              {element}
            </Button>
          </TableElement.Th>
        );
      })}
    </TableElement.Tr>
  </TableElement.Thead>
));

TableHead.displayName = 'TableHead';

// Table Body or Content
const TableBody = React.forwardRef<
  React.ElementRef<typeof TableElement.Tbody>,
  React.ComponentPropsWithoutRef<typeof TableElement.Tbody> & {
    data: IUser[];
    loading: boolean;
    activePage: number;
    totalPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  }
>(({ data, loading, activePage, setPage, totalPage, ...props }, ref) => (
  <TableElement.Tbody {...props} ref={ref}>
    {!loading &&
      data &&
      data.map((value) => (
        <TableElement.Tr key={value.id}>
          <TableElement.Td>
            <Group>
              <Avatar src={`/uploads/${value.avatar}`} alt={`Avatar for ${value.name}`} />
              <Text>{value.name}</Text>
            </Group>
          </TableElement.Td>
          <TableElement.Td>{value.gender}</TableElement.Td>
          <TableElement.Td>{value.eyes}</TableElement.Td>
          <TableElement.Td>{value.hair}</TableElement.Td>
          <TableElement.Td>
            <Button component="a" color="grape" variant="subtle" href={`users/view/${value.id}`}>
              View
            </Button>
          </TableElement.Td>
          <TableElement.Td>
            <Button component="a" color="grape" href={`users/edit/${value.id}`}>Edit</Button>
          </TableElement.Td>
        </TableElement.Tr>
      ))}
    {loading &&
      [1, 1, 1, 1, 1].map((value, index) => (
        <TableElement.Tr key={index}>
          <TableElement.Td>
            <div style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }}>
              <Skeleton height={30} circle />
              <Skeleton height={8} ml="sm" width={'10%'} />
            </div>
          </TableElement.Td>
          <TableElement.Td>
            <Skeleton height={8} width={'20%'} />
          </TableElement.Td>
          <TableElement.Td>
            <Skeleton height={8} width={'10%'} />
          </TableElement.Td>
          <TableElement.Td>
            <Skeleton height={30} />
          </TableElement.Td>
          <TableElement.Td>
            <Skeleton height={30} />
          </TableElement.Td>
        </TableElement.Tr>
      ))}
    <Pagination total={totalPage} value={activePage} color="grape" onChange={setPage} mt="sm" />
  </TableElement.Tbody>
));

TableBody.displayName = 'TableBody';

// Table Wrapper on container
const TableContainer = React.forwardRef<
  React.ElementRef<typeof TableElement.ScrollContainer>,
  React.ComponentPropsWithoutRef<typeof TableElement.ScrollContainer>
>(({ children, ...props }, ref) => (
  <TableElement.ScrollContainer ref={ref} {...props}>
    <TableElement verticalSpacing="xs">{children}</TableElement>
  </TableElement.ScrollContainer>
));

TableContainer.displayName = 'TableContainer';

export { TableContainer, TableHead, TableBody };
