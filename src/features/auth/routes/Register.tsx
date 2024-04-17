import { Link } from 'react-router-dom';
import { Card, TextInput, Center, Group, Title, Stack, Button, Anchor, Text } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPassword: '',
      nickname: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('必填'),
      password: Yup.string().required('必填'),
      repeatPassword: Yup.string()
        .required('必填')
        .oneOf([Yup.ref('password')], '密碼與確認密碼不同'),
      nickname: Yup.string().required('必填'),
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
            <IconUserPlus />
            註冊
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
          <TextInput
            label="確認密碼"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextInput
            label="暱稱"
            name="nickname"
            value={formik.values.nickname}
            error={formik.errors.nickname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button type="submit">註冊</Button>
          <Text ta="center">
            已經有帳戶?
            <Anchor component={Link} to="/auth/login">
              登入
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Center>
  );
};