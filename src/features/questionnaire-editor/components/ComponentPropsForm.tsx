import { useCallback } from 'react';
import { Title } from '@mantine/core';
import { useComponentListStore } from '../store/useComponentList';
import { useSelectedComponent } from '../hooks/useSelectedComponent';
import { getConfigByType } from '../components';
import { ComponentProps } from '../types';

const Empty = () => {
  return (
    <Title c="blue" order={5} ta="center" p="md">
      尚未選中組件
    </Title>
  );
};

export const ComponentPropsForm = () => {
  const updateComponent = useComponentListStore((state) => state.updateComponentProps);
  const selectedComponent = useSelectedComponent();

  const handleChange = useCallback(
    (newProps: Partial<ComponentProps>) => {
      if (!selectedComponent?.frontendId) return;
      updateComponent(selectedComponent?.frontendId, newProps);
    },
    [selectedComponent?.frontendId, updateComponent],
  );

  if (!selectedComponent) return <Empty />;

  const { type, props } = selectedComponent;

  const config = getConfigByType(type);
  if (!config) return <Empty />;

  const { PropsForm } = config;

  return (
    <div
      style={{
        opacity: selectedComponent?.isLocked ? 0.5 : 1,
        cursor: selectedComponent?.isLocked ? 'not-allowed' : 'default',
        pointerEvents: selectedComponent?.isLocked ? 'none' : 'auto',
      }}
    >
      <PropsForm {...props} onChange={handleChange} key={selectedComponent.frontendId} />
    </div>
  );
};
