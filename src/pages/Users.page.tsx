/* eslint-disable import/extensions */
import { Card, Flex, Grid, Stack, TextInput } from '@mantine/core';
import { TableBody, TableContainer, TableHead } from '@/components/ui/Table';
import { useUserFinder } from '@/hooks';
import { DropDown } from '@/components/ui/dropdown';
import { eyeColour, gender, glasses, hairColorOptions } from '@/util/constants';

export function UsersPage() {
  const {
    users,
    isLoading,
    setPage,
    sortedBy,
    totalPages,
    reverseSortDirection,
    activePage,
    query,
    search,
    sorting,
    handleFIlter,
  } = useUserFinder();

  return (
    <>
      <h1>Users</h1>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div>
          <Grid>
            <Grid.Col span={4}>
              <TextInput placeholder="Search by any name" mb="md" value={query} onChange={search} />
            </Grid.Col>
            <Grid.Col span={8}>
              <Stack align="flex-end">
                <Flex gap="md">
                  <DropDown
                    title={'Hair Colour'}
                    data={hairColorOptions}
                    onChange={(e) => handleFIlter('hair', e.value as string)}
                  />
                  <DropDown
                    title={'Eye Colour'}
                    data={eyeColour}
                    onChange={(e) => handleFIlter('eyes', e.value as string)}
                  />
                  <DropDown title={'Gender'} data={gender} onChange={(e) => handleFIlter('gender', e.value as string)} />
                  <DropDown title={'Face wear'} data={glasses} onChange={(e) => handleFIlter('glasses', e.value as string)} />
                </Flex>
              </Stack>
            </Grid.Col>
          </Grid>
        </div>
        <TableContainer minWidth={800}>
          <TableHead
            onSort={sorting}
            reversed={reverseSortDirection}
            sortedBy={sortedBy}
            data={['Name', 'Gender', 'Eyes', 'Hair']}
          />
          <TableBody
            data={users}
            loading={isLoading}
            activePage={activePage}
            totalPage={totalPages}
            setPage={setPage}
          />
        </TableContainer>
      </Card>

      {/* <TableSort /> */}

      {/* <Button my={'md'} onClick={toggle}>
        {opened ? 'Hide filters' : 'Show Filters'}
      </Button>

      <Collapse in={opened}>
        <Paper shadow="sm" p={'lg'} mb="md" withBorder bg={'gray.1'}>
          <Stack gap={10}>
            <TextInput label="Name" placeholder="Enter user's name to filter list" />
            <Select
              label="Hair Colour"
              placeholder="Pick value to filter list"
              data={['Black', 'Brown', 'Blonde', 'Red', 'Grey']}
            />
            <Select
              label="Eye Colour"
              placeholder="Pick value"
              data={[]}
            />
            <Select label="Gender" placeholder="Pick value" data={['Male', 'Female']} />
            <Radio.Group label="Glasses?" defaultValue="all">
              <Group>
                <Radio label="All" value="all" />
                <Radio label="Glasses" value="glasses" />
                <Radio label="No Glasses" value="no-glasses" />
              </Group>
            </Radio.Group>
          </Stack>
        </Paper>
      </Collapse>

      <Group>
        {users.map((user, index) => (
          <Card radius={'md'} withBorder key={index} w={'220'}>
            <Card.Section>
              <Image src={`/uploads/${user.avatar}`} alt={`Avatar for ${user.name}`} />
            </Card.Section>
            <Title my={'md'} order={4}>
              {user.name}
            </Title>
            <Button
              size={'xs'}
              fullWidth
              variant={'outline'}
              color={'grape'}
              component={'a'}
              href={`/users/view/${user.id}`}
            >
              View
            </Button>
          </Card>
        ))}
      </Group> */}
    </>
  );
}
