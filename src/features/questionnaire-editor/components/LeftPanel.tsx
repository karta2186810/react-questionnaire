import { Tabs } from '@mantine/core';
import { ComponentLib } from './ComponentLib';
import { Layers } from './Layers';

export const LeftPanel = () => {
  return (
    <div>
      <Tabs defaultValue="components">
        <Tabs.List>
          <Tabs.Tab value="components">組件庫</Tabs.Tab>
          <Tabs.Tab value="layers">圖層</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="components">
          <ComponentLib />
        </Tabs.Panel>
        <Tabs.Panel value="layers">
          <Layers />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
