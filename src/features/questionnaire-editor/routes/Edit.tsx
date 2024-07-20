import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, LoadingOverlay } from '@mantine/core';
import { useNotification } from '@/hooks/useNotification';
import { useQuestionnaire } from '../api/getQuestionnaire';
import { useComponentListStore } from '../store/useComponentList';
import { usePageInfoStore } from '../store/usePageInfo';
import { useEditorHotKeys } from '../hooks/useEditorHotKeys';
import { useUpdateQuestionnaire } from '../api/updateQuestionnaire';
import { Header } from '../components/Header';
import { Canvas } from '../components/Canvas';
import { LeftPanel } from '../components/LeftPanel';
import { RightPanel } from '../components/RightPanel';
import { ComponentInfo } from '../types';
import classes from './Edit.module.css';

export const Edit = () => {
  useEditorHotKeys();
  const isChangedByRemote = useRef(true);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const { id = '' } = useParams();
  const { data, isFetching } = useQuestionnaire(id);
  const { componentList, resetList, setSelectedId } = useComponentListStore((state) => ({
    componentList: state.current,
    resetList: state.resetList,
    setSelectedId: state.setSelectedId,
  }));
  const { title, isPublished, resetPageInfo } = usePageInfoStore((state) => ({
    title: state.title,
    isPublished: state.isPublished,
    resetPageInfo: state.resetPageInfo,
  }));
  const { isPending: isUpdating, mutateAsync: updateQuestionnaire } = useUpdateQuestionnaire(id);

  useEffect(() => {
    const components = data.components;
    resetList(components);
    if (components.length) setSelectedId(components[0].frontendId);
    resetPageInfo({
      title: data.title,
      isPublished: data.isPublished,
    });
    isChangedByRemote.current = true;
  }, [data, resetList, setSelectedId, resetPageInfo]);

  const notification = useNotification();

  const submitQuestionnaire = useCallback(
    async ({
      title = '',
      isPublished = false,
      list = [],
    }: {
      title?: string;
      isPublished?: boolean;
      list?: ComponentInfo[];
    }) => {
      setHasPendingChanges(false);
      await updateQuestionnaire({ title, isPublished, list });
    },
    [updateQuestionnaire],
  );

  async function handleSaving() {
    await submitQuestionnaire({ title, isPublished, list: componentList });
    notification.success({ message: '保存成功' });
  }
  async function handlePublishing() {
    const newPublished = !isPublished;
    await updateQuestionnaire({ isPublished: newPublished });
    notification.success({ message: newPublished ? '發布成功' : '已取消發布' });
    resetPageInfo({ isPublished: newPublished });
  }

  useEffect(() => {
    if (!isUpdating && hasPendingChanges) {
      submitQuestionnaire({ title, list: componentList });
    }
  }, [isUpdating, hasPendingChanges, submitQuestionnaire, setHasPendingChanges, componentList, title]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isChangedByRemote.current) {
        isChangedByRemote.current = false;
      } else {
        setHasPendingChanges(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [componentList, title]);

  return (
    <div className={classes['edit-layout']}>
      <Header onSave={handleSaving} onPublish={handlePublishing} loading={isUpdating} />
      <div className={classes['content-wrapper']}>
        <div className={classes.left}>
          <Card className={classes.scroll} radius={0}>
            <LeftPanel />
          </Card>
        </div>
        <main className={classes.main} onClick={() => setSelectedId('')}>
          <Card className={classes.canvas} withBorder shadow="md">
            <LoadingOverlay visible={isFetching} zIndex={1000} />
            <div className={classes.scroll}>
              <Canvas />
            </div>
          </Card>
        </main>
        <div className={classes.right}>
          <Card className={classes.scroll} radius={0}>
            <RightPanel />
          </Card>
        </div>
      </div>
    </div>
  );
};
