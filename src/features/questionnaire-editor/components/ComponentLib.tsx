import { Title, Stack, Divider } from '@mantine/core';
import { TITLE_CONFIG } from './Title';
import { INPUT_CONFIG } from './Input';
import { PARAGRAPH_CONFIG } from './Paragraph';
import { TEXTAREA_CONFIG } from './Textarea';
import { useComponentListStore } from '../store/useComponentList';
import { ComponentConfig } from '../types';
import classes from './ComponentLib.module.css';

type ComponentConfigGroup = {
  groupId: string;
  title: string;
  configs: ComponentConfig[];
};

const COMPONENT_CONFIG_GROUP: ComponentConfigGroup[] = [
  {
    groupId: 'text',
    title: '文本組件',
    configs: [TITLE_CONFIG, PARAGRAPH_CONFIG],
  },
  {
    groupId: 'input',
    title: '輸入組件',
    configs: [INPUT_CONFIG, TEXTAREA_CONFIG],
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
            <Stack gap="sm" mt={12}>
              {group.configs.map((config) => {
                const Component = config.Component;
                return (
                  <div>
                    <Title order={6}>{config.title}</Title>
                    <div
                      className={classes['component-wrapper']}
                      key={config.type}
                      onClick={() => addComponent(config)}
                    >
                      <div className={classes['component']}>
                        <Component {...config.defaultProps} />
                      </div>
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
