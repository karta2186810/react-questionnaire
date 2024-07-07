import { Card, Group, Button, ActionIcon, Title, Tooltip } from '@mantine/core';
import {
  IconChevronLeft,
  IconDeviceFloppy,
  IconCheck,
  IconTrash,
  IconEye,
  IconEyeOff,
  IconLock,
  IconLockOff,
  IconCopy,
  IconClipboard,
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons-react';
import { useComponentListStore } from '../store/useComponentList';
import { useSelectedComponent } from '../hooks/useSelectedComponent';
import classes from './Header.module.css';

export const Header = () => {
  const selectedComponent = useSelectedComponent();
  const {
    copiedComponent,
    copyComponent,
    pasteComponent,
    removeComponent,
    toggleComponentVisible,
    toggleComponentLock,
    selectComponent,
  } = useComponentListStore((state) => ({
    copiedComponent: state.copiedComponent,
    removeComponent: state.removeComponent,
    toggleComponentVisible: state.toggleComponentVisible,
    toggleComponentLock: state.toggleComponentLock,
    copyComponent: state.copyComponent,
    pasteComponent: state.pasteComponent,
    selectComponent: state.selectComponent,
  }));

  function handleDelete() {
    if (!selectedComponent) return;
    removeComponent(selectedComponent.frontendId);
  }
  function handleVisible() {
    if (!selectedComponent) return;
    toggleComponentVisible(selectedComponent.frontendId, !selectedComponent.isVisible);
  }
  function handleLock() {
    if (!selectedComponent) return;
    toggleComponentLock(selectedComponent.frontendId, !selectedComponent.isLocked);
  }
  function handleCopy() {
    if (!selectedComponent) return;
    copyComponent(selectedComponent.frontendId);
  }

  return (
    <Card withBorder>
      <Group justify="space-between" align="center">
        <Group gap="sm">
          <Button variant="transparent" leftSection={<IconChevronLeft width={20} />}>
            返回
          </Button>
          <Title order={3}>標題</Title>
        </Group>
        <Group gap="sm">
          <Tooltip label="刪除">
            <ActionIcon variant="default" disabled={!selectedComponent} onClick={handleDelete}>
              <IconTrash className={classes.icon} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={selectedComponent?.isVisible ? '隱藏' : '顯示'}>
            <ActionIcon variant="default" disabled={!selectedComponent} onClick={handleVisible}>
              {selectedComponent?.isVisible ? (
                <IconEyeOff className={classes.icon} />
              ) : (
                <IconEye className={classes.icon} />
              )}
            </ActionIcon>
          </Tooltip>
          <Tooltip label={selectedComponent?.isLocked ? '解鎖' : '鎖定'}>
            <ActionIcon variant="default" disabled={!selectedComponent} onClick={handleLock}>
              {selectedComponent?.isLocked ? (
                <IconLockOff className={classes.icon} />
              ) : (
                <IconLock className={classes.icon} />
              )}
            </ActionIcon>
          </Tooltip>
          <Tooltip label="複製">
            <ActionIcon variant="default" disabled={!selectedComponent} onClick={handleCopy}>
              <IconCopy className={classes.icon} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="貼上">
            <ActionIcon variant="default" disabled={!copiedComponent} onClick={pasteComponent}>
              <IconClipboard className={classes.icon} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="選中上一個">
            <ActionIcon variant="default" disabled={!selectedComponent} onClick={() => selectComponent('prev')}>
              <IconChevronUp className={classes.icon} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="選中下一個">
            <ActionIcon variant="default" disabled={!selectedComponent} onClick={() => selectComponent('next')}>
              <IconChevronDown className={classes.icon} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Group gap="sm">
          <Button variant="outline" leftSection={<IconDeviceFloppy />}>
            保存
          </Button>
          <Button leftSection={<IconCheck />}>發布</Button>
        </Group>
      </Group>
    </Card>
  );
};
