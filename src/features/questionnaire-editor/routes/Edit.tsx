import { useEffect } from 'react';
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
import classes from './Edit.module.css';

export const Edit = () => {
  useEditorHotKeys();

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

  useEffect(() => {
    const components = data.components;
    resetList(components);
    if (components.length) setSelectedId(components[0].frontendId);
    resetPageInfo({
      title: data.title,
      isPublished: data.isPublished,
    });
  }, [data, resetList, setSelectedId, resetPageInfo]);

  const mutation = useUpdateQuestionnaire(id);
  const notification = useNotification();
  async function handleSave() {
    await mutation.mutateAsync({ title, isPublished, list: componentList });
    notification.success({ message: '保存成功' });
  }
  async function handlePublish() {
    const newPublished = !isPublished;
    await mutation.mutateAsync({ isPublished: newPublished });
    notification.success({ message: newPublished ? '發布成功' : '已取消發布' });
    resetPageInfo({ isPublished: newPublished });
  }

  return (
    <div className={classes['edit-layout']}>
      <Header onSave={handleSave} onPublish={handlePublish} loading={mutation.isPending} />
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
