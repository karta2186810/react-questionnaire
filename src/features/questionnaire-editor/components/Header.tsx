import { FC, PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Group, Button, ActionIcon, Title, Tooltip, Input } from '@mantine/core';
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
  IconPencil,
  IconX,
  IconArrowForward,
  IconArrowBack,
} from '@tabler/icons-react';
import { useComponentListStore } from '../store/useComponentList';
import { usePageInfoStore } from '../store/usePageInfo';
import { useSelectedComponent } from '../hooks/useSelectedComponent';
import classes from './Header.module.css';
import { useTitle } from '@/hooks/useTitle';

const HeaderTitle: FC<{ title: string; onChange: (value: string) => void }> = ({ title, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  useTitle(title);

  return (
    <Group>
      {isEditing ? (
        <Input
          defaultValue={title}
          placeholder="請輸入標題"
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            const value = (e.target as HTMLInputElement).value;
            if (value) onChange?.(value);
            setIsEditing(false);
          }}
        />
      ) : (
        <Title order={3}>{title}</Title>
      )}
      <ActionIcon variant="subtle" onClick={() => setIsEditing((isEditing) => !isEditing)}>
        {isEditing ? <IconX /> : <IconPencil />}
      </ActionIcon>
    </Group>
  );
};

type ControllerButtonProps = {
  label: string;
  disabled: boolean;
  onClick: () => void;
};
const ControllerButton: FC<PropsWithChildren<ControllerButtonProps>> = ({
  label,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <Tooltip label={label}>
      <ActionIcon variant="default" disabled={disabled} onClick={onClick}>
        {children}
      </ActionIcon>
    </Tooltip>
  );
};

type HeaderProps = {
  loading: boolean;
  onSave: () => void;
  onPublish: () => void;
};

export const Header: FC<HeaderProps> = ({ loading, onSave, onPublish }) => {
  const selectedComponent = useSelectedComponent();
  const {
    previousComponentList,
    forwardComponentList,
    undoComponentList,
    redoComponentList,
    copiedComponent,
    copyComponent,
    pasteComponent,
    removeComponent,
    toggleComponentVisible,
    toggleComponentLock,
    selectComponent,
  } = useComponentListStore((state) => ({
    previousComponentList: state.previous,
    forwardComponentList: state.forward,
    undoComponentList: state.undo,
    redoComponentList: state.redo,
    copiedComponent: state.copiedComponent,
    removeComponent: state.removeComponent,
    toggleComponentVisible: state.toggleComponentVisible,
    toggleComponentLock: state.toggleComponentLock,
    copyComponent: state.copyComponent,
    pasteComponent: state.pasteComponent,
    selectComponent: state.selectComponent,
  }));
  const { title, isPublished, resetPageInfo } = usePageInfoStore((state) => ({
    title: state.title,
    isPublished: state.isPublished,
    resetPageInfo: state.resetPageInfo,
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
          <Button
            component={Link}
            to="/management/list"
            variant="transparent"
            leftSection={<IconChevronLeft width={20} />}
          >
            返回
          </Button>
          <HeaderTitle title={title} onChange={(title) => resetPageInfo({ title })} />
        </Group>
        <Group gap="sm" className={classes['operation-buttons']}>
          <ControllerButton label="撤銷" disabled={!previousComponentList.length} onClick={undoComponentList}>
            <IconArrowBack className={classes.icon} />
          </ControllerButton>
          <ControllerButton label="重做" disabled={!forwardComponentList.length} onClick={redoComponentList}>
            <IconArrowForward className={classes.icon} />
          </ControllerButton>
          <ControllerButton label="刪除" disabled={!selectedComponent} onClick={handleDelete}>
            <IconTrash className={classes.icon} />
          </ControllerButton>
          <ControllerButton
            label={selectedComponent?.isVisible ? '隱藏' : '顯示'}
            disabled={!selectedComponent}
            onClick={handleVisible}
          >
            {selectedComponent?.isVisible ? (
              <IconEyeOff className={classes.icon} />
            ) : (
              <IconEye className={classes.icon} />
            )}
          </ControllerButton>
          <ControllerButton
            label={selectedComponent?.isLocked ? '解鎖' : '鎖定'}
            disabled={!selectedComponent}
            onClick={handleLock}
          >
            {selectedComponent?.isLocked ? (
              <IconLockOff className={classes.icon} />
            ) : (
              <IconLock className={classes.icon} />
            )}
          </ControllerButton>
          <ControllerButton label="複製" disabled={!selectedComponent} onClick={handleCopy}>
            <IconCopy className={classes.icon} />
          </ControllerButton>
          <ControllerButton label="貼上" disabled={!copiedComponent} onClick={pasteComponent}>
            <IconClipboard className={classes.icon} />
          </ControllerButton>
          <ControllerButton label="選中上一個" disabled={!selectedComponent} onClick={() => selectComponent('prev')}>
            <IconChevronUp className={classes.icon} />
          </ControllerButton>
          <ControllerButton label="選中下一個" disabled={!selectedComponent} onClick={() => selectComponent('next')}>
            <IconChevronDown className={classes.icon} />
          </ControllerButton>
        </Group>
        <Group gap="sm">
          <Button disabled={loading} variant="outline" leftSection={<IconDeviceFloppy />} onClick={onSave}>
            {loading ? '保存中...' : '保存'}
          </Button>
          <Button disabled={loading} leftSection={isPublished ? <IconX /> : <IconCheck />} onClick={onPublish}>
            {isPublished ? '取消發布' : '發布'}
          </Button>
        </Group>
      </Group>
    </Card>
  );
};
