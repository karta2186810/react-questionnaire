import { Link } from 'react-router-dom';
import { Center, Card, Stack, Title, Text, Anchor, TextInput, Button, Group } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('必填'),
      password: Yup.string().required('必填'),
      rememberMe: Yup.boolean().required('必填'),
    }),
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <Center mih="calc(100dvh - var(--app-shell-header-height))">
      <Card
        w="100%"
        maw={480}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Stack>
          <Title component={Group} order={3}>
            <IconUser />
            登入
          </Title>
          <TextInput
            label="用戶名"
            name="username"
            value={formik.values.username}
            error={formik.errors.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextInput
            label="密碼"
            name="password"
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button type="submit">登入</Button>
          <Text ta="center">
            尚未有帳戶?
            <Anchor component={Link} to="/auth/register">
              註冊
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Center>
  );
};
