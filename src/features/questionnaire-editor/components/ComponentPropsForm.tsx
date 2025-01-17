import { FC, useCallback } from 'react';
import { Title } from '@mantine/core';
import { useComponentListStore } from '../store/useComponentList';
import { useSelectedComponent } from '../hooks/useSelectedComponent';
import { getConfigByType } from '../components';

const Empty = () => {
  return (
    <Title c="blue" order={5} ta="center" p="md">
      尚未選中組件
    </Title>
  );
};

export const ComponentPropsForm = () => {
  const { updateComponent, listVersion } = useComponentListStore((state) => ({
    updateComponent: state.updateComponentProps,
    listVersion: state.listVersion,
  }));
  const selectedComponent = useSelectedComponent();

  const handleChange = useCallback(
    (newProps: Record<string, unknown>) => {
      if (!selectedComponent?.frontendId) return;
      updateComponent(selectedComponent?.frontendId, newProps);
    },
    [selectedComponent?.frontendId, updateComponent],
  );

  if (!selectedComponent) return <Empty />;

  const { type, props } = selectedComponent;

  const config = getConfigByType(type);
  if (!config) return <Empty />;

  const PropsForm = config.PropsForm as unknown as FC<{
    [key: string]: unknown;
    onChange: (newProps: Record<string, unknown>) => void;
  }>;

  return (
    <div
      style={{
        opacity: selectedComponent?.isLocked ? 0.5 : 1,
        cursor: selectedComponent?.isLocked ? 'not-allowed' : 'default',
        pointerEvents: selectedComponent?.isLocked ? 'none' : 'auto',
      }}
    >
      <PropsForm {...props} onChange={handleChange} key={selectedComponent.frontendId + listVersion} />
    </div>
  );
};
