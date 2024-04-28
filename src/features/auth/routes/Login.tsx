import { Link } from 'react-router-dom';
import {
  Center,
  Card,
  Stack,
  Title,
  Text,
  Anchor,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Checkbox,
} from '@mantine/core';
import { notification } from '@/libs/notification';
import { IconUser } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '../hooks';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const { isPending, mutate: login } = useLogin();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('必填'),
      password: Yup.string().required('必填'),
      rememberMe: Yup.boolean(),
    }),
    async onSubmit({ username, password, rememberMe }) {
      login(
        { username, password, rememberMe },
        {
          onSuccess: () => {
            navigate('/');
            notification.success({ message: '登入成功' });
          },
        },
      );
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
            error={formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          <PasswordInput
            label="密碼"
            name="password"
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          <Checkbox
            label="記住我"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <Button type="submit" disabled={isPending}>
            登入
          </Button>
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
