import { Avatar, Box, Card, Group, Loader, LoadingOverlay, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useEditUser } from '@/hooks';

export function ViewPage() {
  const { id }: { id?: string } = useParams();

  const { user, loading } = useEditUser(id as string);

  return (
    <>
      <h1>Users Detail</h1>
      <Card padding="lg">
        <Box pos="relative">
          <LoadingOverlay visible={loading} loaderProps={{ children: <Loader size={30} /> }} />
          <div>
            <Group wrap="nowrap">
              <Avatar
                src={`/uploads/${user?.avatar}`}
                alt={`Avatar for ${user?.name}`}
                size={120}
                radius="md"
              />
              <div>
                <Text fz="lg" tt="uppercase" fw={700}>
                  Name: {user?.name}
                </Text>

                <Text fz="md" tt="capitalize" fw={500}>
                  Gender: {user?.gender}
                </Text>

                <Text fz="xs" tt="capitalize" c="dimmed">
                  Eye color: {user?.eyes}
                </Text>
                <Text fz="xs" tt="capitalize" c="dimmed">
                  Hair color: {user?.hair}
                </Text>
                <Text fz="xs" tt="capitalize" c="dimmed">
                  {user?.glasses ? 'Has Grasses' : 'Do Not Have Glasses'}
                </Text>
              </div>
            </Group>
          </div>
        </Box>
      </Card>
    </>
  );
}
