import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, LoadingOverlay } from '@mantine/core';
import { useQuestionnaire } from '../api/getQuestionnaire';
import { useComponentListStore } from '../store/useComponentList';
import classes from './Edit.module.css';
import { Canvas } from '../components/Canvas';
import { LeftPanel } from '../components/LeftPanel';
import { RightPanel } from '../components/RightPanel';

export const Edit = () => {
  const { id = '' } = useParams();
  const { data, isFetching } = useQuestionnaire(id);
  const { resetList, setSelectedId } = useComponentListStore((state) => ({
    resetList: state.resetList,
    setSelectedId: state.setSelectedId,
  }));

  useEffect(() => {
    const components = data.components;
    resetList(components);
    if (components.length) setSelectedId(components[0].frontendId);
  }, [data, resetList, setSelectedId]);

  return (
    <div className={classes['edit-layout']}>
      <div>Header</div>
      <div className={classes['content-wrapper']}>
        <Card className={classes.left} radius={0}>
          <LeftPanel />
        </Card>
        <main className={classes.main} onClick={() => setSelectedId('')}>
          <Card className={classes.canvas} withBorder shadow="md">
            <LoadingOverlay visible={isFetching} zIndex={1000} />
            <div className={classes.scroll}>
              <Canvas />
            </div>
          </Card>
        </main>
        <Card className={classes.right} radius={0}>
          <RightPanel />
        </Card>
      </div>
    </div>
  );
};
