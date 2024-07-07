import { FC } from 'react';
import { Stack, Group, TextInput, ActionIcon, Text, Button, Select, Checkbox } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { Formik, FieldArray, FormikErrors } from 'formik';
import { object, array, string } from 'yup';
import { nanoid } from 'nanoid';
import { PropsFormProps } from '../../types';
import { Option, RadioProps } from './Component';

export const RadioPropsForm: FC<PropsFormProps<RadioProps>> = ({
  onChange,
  title,
  defaultChecked,
  vertical,
  list = [],
}) => {
  const schema = object().shape({
    title: string().required('必填'),
    list: array(
      object().shape({
        label: string().required('必填'),
      }),
    ).test('unique-label', '選項不能重複', (values) => {
      if (!values) return true;
      return values.length === new Set(values.map((option) => option.label)).size;
    }),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        title,
        list,
        defaultChecked,
        vertical,
      }}
      onSubmit={(values) => {
        onChange?.(values);
      }}
    >
      {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
        <Stack py="md" gap="md">
          <TextInput
            label="標題"
            name="title"
            placeholder="請輸入選項標題"
            value={values.title}
            error={errors.title}
            onChange={handleChange}
            onBlur={() => {
              if (errors.title) return;
              handleSubmit();
            }}
          />
          <div>
            <Text size="sm" fw={500}>
              選項
            </Text>
            <FieldArray name="list">
              {(arrayHelpers) => (
                <Stack>
                  {values.list.map((option, index) => (
                    <Group key={option.value} gap={0}>
                      <TextInput
                        name={`list[${index}].label`}
                        value={option.label}
                        flex={1}
                        placeholder="請輸入選項標題"
                        onChange={handleChange}
                        onBlur={() => {
                          if (errors.list !== undefined) return;
                          handleSubmit();
                        }}
                        error={
                          Array.isArray(errors.list)
                            ? typeof errors.list[index] === 'string'
                              ? (errors.list[index] as string)
                              : (errors.list[index] as FormikErrors<Option>).label
                            : undefined
                        }
                      />
                      <ActionIcon
                        variant="transparent"
                        color="red"
                        style={{ visibility: index <= 1 ? 'hidden' : 'visible' }}
                        onClick={() => {
                          if (option.value === values.defaultChecked) {
                            setFieldValue('defaultChecked', values.list[0].value);
                          }
                          arrayHelpers.remove(index);
                          handleSubmit();
                        }}
                      >
                        <IconTrash width={16} height={16} />
                      </ActionIcon>
                    </Group>
                  ))}
                  {typeof errors.list === 'string' ? (
                    <Text size="sm" c="red">
                      {errors.list}
                    </Text>
                  ) : undefined}
                  <Button
                    variant="filled"
                    color="blue"
                    leftSection={<IconPlus />}
                    disabled={errors.list !== undefined}
                    onClick={() => {
                      arrayHelpers.push({
                        label: `選項${values.list.length + 1}`,
                        value: nanoid(5),
                      });
                      handleSubmit();
                    }}
                  >
                    新增選項
                  </Button>
                </Stack>
              )}
            </FieldArray>
          </div>
          <Select
            label="默認選中"
            data={values.list}
            disabled={errors.list !== undefined}
            value={defaultChecked}
            onChange={(value) => {
              setFieldValue('defaultChecked', value);
              handleSubmit();
            }}
          />
          <Checkbox
            label="垂直排列"
            name="vertical"
            checked={vertical}
            onChange={(e) => {
              handleChange(e);
              handleSubmit();
            }}
          />
        </Stack>
      )}
    </Formik>
  );
};
