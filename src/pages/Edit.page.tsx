import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  ComboboxData,
  Loader,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useEditUser } from '@/hooks';
import { eyeColour, gender, hairColorOptions } from '@/util/constants';

export function EditPage() {
  const { id }: { id?: string } = useParams();
  const { user, loading, handleChange, handleSubmit, values, isSubmitting } = useEditUser(
    id as string
  );

  return (
    <>
      <Title>Edit</Title>
      <Card maw={460} shadow="md" withBorder mx="auto">
        <Box pos="relative">
          <LoadingOverlay
            visible={loading || isSubmitting}
            loaderProps={{ children: <Loader size={30} /> }}
          />
          <form onSubmit={handleSubmit}>
            <Stack>
              <Avatar
                src={`/uploads/${user?.avatar}`}
                alt={`Avatar for ${user?.name}`}
                size={200}
                mx="auto"
                radius="lg"
              />
              <TextInput
                label="User's Name"
                onChange={handleChange}
                name="name"
                value={values.name}
                placeholder="Name"
              />
              <Select
                label="User's Gender"
                name="gender"
                onChange={handleChange('gender' as any) as any}
                value={values.gender}
                placeholder="Pick value"
                data={gender as ComboboxData | undefined}
              />
              <Select
                label="User's Hair Colour"
                name="hair"
                onChange={handleChange('hair' as any) as any}
                value={values.hair}
                placeholder="Pick value"
                data={hairColorOptions as ComboboxData | undefined}
              />
              <Select
                label="User's Eyes Colour"
                name="hair"
                onChange={handleChange('eyes' as any) as any}
                value={values.eyes}
                placeholder="Pick value"
                data={eyeColour as ComboboxData | undefined}
              />
              <Checkbox
                checked={values.glasses as boolean}
                name="glasses"
                onChange={handleChange}
                label="This User Wears Glasses"
              />
              {/* <TextInput onChange={handleChange} placeholder="roles" /> */}
            </Stack>
            <Button loading={isSubmitting} type="submit" mt="sm">
              Submit
            </Button>
          </form>
        </Box>
      </Card>
    </>
  );
}
