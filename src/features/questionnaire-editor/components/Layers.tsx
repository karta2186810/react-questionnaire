import { useEffect, useRef, useState } from 'react';
import { NavLink, ActionIcon, Group, Tooltip, Input } from '@mantine/core';
import { IconEye, IconEyeOff, IconLockOff, IconLock } from '@tabler/icons-react';
import { useComponentListStore } from '../store/useComponentList';
import classes from './Layers.module.css';

export const Layers = () => {
  const changingTitleRef = useRef<HTMLInputElement | null>(null);
  const [changingId, setChangingId] = useState<string | null>(null);
  useEffect(() => {
    changingTitleRef.current?.focus();
  }, [changingId]);

  const { list, setSelectedId, selectedId, updateComponent, toggleComponentVisible } = useComponentListStore(
    (state) => ({
      list: state.current,
      selectedId: state.selectedId,
      setSelectedId: state.setSelectedId,
      updateComponent: state.updateComponent,
      toggleComponentVisible: state.toggleComponentVisible,
    }),
  );

  return (
    <>
      {list.map((component) => (
        <NavLink
          key={component.frontendId}
          label={
            <div
              onDoubleClick={(e) => {
                e.stopPropagation();
                setChangingId(component.frontendId);
              }}
            >
              {changingId === component.frontendId ? (
                <Input
                  ref={changingTitleRef}
                  defaultValue={component.title}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return;
                    (e.target as HTMLInputElement).blur();
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      updateComponent(component.frontendId, { title: e.target.value });
                    }
                    setChangingId(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                component.title
              )}
            </div>
          }
          active={component.frontendId === selectedId}
          rightSection={
            <Group gap="sm">
              <Tooltip label={component.isVisible ? '隱藏' : '顯示'}>
                <ActionIcon
                  size="sm"
                  variant={!component.isVisible ? 'fill' : 'subtle'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComponentVisible(component.frontendId, !component.isVisible);
                  }}
                >
                  {component.isVisible ? <IconEyeOff className={classes.icon} /> : <IconEye className={classes.icon} />}
                </ActionIcon>
              </Tooltip>
              <Tooltip label={component.isLocked ? '解鎖' : '鎖定'}>
                <ActionIcon
                  size="sm"
                  variant={component.isLocked ? 'fill' : 'subtle'}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateComponent(component.frontendId, { isLocked: !component.isLocked });
                  }}
                >
                  {component.isLocked ? (
                    <IconLockOff className={classes.icon} />
                  ) : (
                    <IconLock className={classes.icon} />
                  )}
                </ActionIcon>
              </Tooltip>
            </Group>
          }
          onClick={() => {
            if (!component.isVisible) return;
            setSelectedId(component.frontendId);
          }}
        />
      ))}
    </>
  );
};