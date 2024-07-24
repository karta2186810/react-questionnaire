import { FC, MouseEvent } from 'react';
import { clsx } from 'clsx';
import { arrayMove } from '@dnd-kit/sortable';
import { useComponentListStore } from '../store/useComponentList';
import { ComponentInfo } from '../types';
import { getConfigByType } from '../components';
import { SortableWrapper } from './SortableWrapper';
import { SortableItem } from './SortableItem';
import classes from './Canvas.module.css';
import { DragEndEvent } from '@dnd-kit/core';

const getComponent = (componentInfo: ComponentInfo) => {
  const config = getConfigByType(componentInfo.type);
  if (!config) return null;
  const Component = config.Component as FC<unknown>;
  return <Component {...componentInfo.props} />;
};

export const Canvas = () => {
  const { list, setList, setSelectedId, selectedId } = useComponentListStore((state) => ({
    list: state.current,
    setList: state.setList,
    setSelectedId: state.setSelectedId,
    selectedId: state.selectedId,
  }));
  const visibleComponents = list.filter((component) => component.isVisible);

  const handleComponentClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
  };

  const handleSortEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = list.findIndex((item) => item.frontendId === active.id);
    const newIndex = list.findIndex((item) => item.frontendId === over.id);

    setList(arrayMove(list, oldIndex, newIndex));
  };

  return (
    <div className={classes.canvas}>
      <SortableWrapper items={visibleComponents.map((component) => component.frontendId)} onSortEnd={handleSortEnd}>
        {visibleComponents.map((component) => {
          const wrapperClass = clsx({
            [classes['component-wrapper']]: true,
            [classes['component-wrapper--active']]: selectedId === component.frontendId,
            [classes['component-wrapper--locked']]: component.isLocked,
          });
          return (
            <SortableItem id={component.frontendId} className={wrapperClass} key={component.frontendId}>
              <div onClick={(e) => handleComponentClick(e, component.frontendId)}>
                <div className={classes.component}>{getComponent(component)}</div>
              </div>
            </SortableItem>
          );
        })}
      </SortableWrapper>
    </div>
  );
};
