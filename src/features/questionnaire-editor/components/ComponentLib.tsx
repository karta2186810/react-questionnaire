import { Title, Stack, Divider } from '@mantine/core';
import { TITLE_CONFIG } from './Title';
import { INPUT_CONFIG } from './Input';
import { ComponentConfig } from '../types';
import classes from './ComponentLib.module.css';
import { useComponentListStore } from '../store/useComponentList';

type ComponentConfigGroup = {
  groupId: string;
  title: string;
  configs: ComponentConfig[];
};

const COMPONENT_CONFIG_GROUP: ComponentConfigGroup[] = [
  {
    groupId: 'text',
    title: '文本組件',
    configs: [TITLE_CONFIG],
  },
  {
    groupId: 'input',
    title: '輸入組件',
    configs: [INPUT_CONFIG],
  },
];

export const ComponentLib = () => {
  const { addComponent } = useComponentListStore((state) => ({
    addComponent: state.addComponent,
  }));

  return (
    <div className={classes['left-panel']}>
      {COMPONENT_CONFIG_GROUP.map((group, index) => {
        return (
          <div key={group.groupId}>
            {index > 0 && <Divider my="lg" />}
            <Title order={5}>{group.title}</Title>
            <Stack gap="xs" mt={12}>
              {group.configs.map((config) => {
                const Component = config.Component;
                return (
                  <div className={classes['component-wrapper']} key={config.type} onClick={() => addComponent(config)}>
                    <div className={classes['component']}>
                      <Component {...config.defaultProps} />
                    </div>
                  </div>
                );
              })}
            </Stack>
          </div>
        );
      })}
    </div>
  );
};
