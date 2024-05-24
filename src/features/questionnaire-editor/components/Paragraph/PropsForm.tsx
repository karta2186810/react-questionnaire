import { FC } from 'react';
import { Stack, Textarea, Checkbox } from '@mantine/core';
import { ParagraphProps } from './Component';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import { PropsFormProps } from '../../types';

export const ParagraphPropsForm: FC<PropsFormProps<ParagraphProps>> = ({ onChange, text, isCenter }) => {
  const form = useFormik({
    initialValues: { text },
    validationSchema: object({
      text: string().required('必填'),
    }),
    onSubmit: () => {},
  });

  return (
    <Stack py="md" gap="lg">
      <Textarea
        label="文字"
        placeholder="文字"
        rows={10}
        value={form.values.text}
        onChange={(e) => {
          form.setFieldValue('text', e.target.value);
          onChange?.({ text: e.target.value });
        }}
        error={form.touched.text && form.errors.text}
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
