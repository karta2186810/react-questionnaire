import { FC } from 'react';
import { Stack, TextInput, Select, Checkbox } from '@mantine/core';
import { TitleProps } from './Component';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import { PropsFormProps } from '../../types';

export const TitlePropsForm: FC<PropsFormProps<TitleProps>> = ({ onChange, text, order, isCenter }) => {
  const form = useFormik({
    initialValues: { text },
    validationSchema: object({
      text: string().required('必填'),
    }),
    onSubmit: () => {},
  });

  return (
    <Stack py="md" gap="lg">
      <TextInput
        label="文字"
        placeholder="文字"
        value={form.values.text}
        onChange={(e) => {
          form.setFieldValue('text', e.target.value);
          onChange?.({ text: e.target.value });
        }}
        error={form.touched.text && form.errors.text}
      />
      <Select
        label="文字大小"
        name="order"
        value={order + ''}
        onChange={(e) => onChange?.({ order: e ? +e : undefined })}
        data={['1', '2', '3']}
        placeholder="文字大小"
      />
      <Checkbox
        label="文字置中"
        name="isCenter"
        checked={isCenter}
        onChange={(e) => onChange?.({ isCenter: e.target.checked })}
      />
    </Stack>
  );
};
