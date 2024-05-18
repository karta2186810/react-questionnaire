import { Tabs } from '@mantine/core';
import { ComponentPropsForm } from './ComponentPropsForm';

export const RightPanel = () => {
  return (
    <div>
      <Tabs defaultValue="propsForm">
        <Tabs.List>
          <Tabs.Tab value="propsForm">組件屬性</Tabs.Tab>
          <Tabs.Tab value="pageConfig">頁面設定</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="propsForm">
          <ComponentPropsForm />
        </Tabs.Panel>
        <Tabs.Panel value="pageConfig">頁面設定</Tabs.Panel>
      </Tabs>
    </div>
  );
};
