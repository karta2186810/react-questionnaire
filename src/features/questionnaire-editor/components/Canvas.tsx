import { FC, MouseEvent } from 'react';
import { clsx } from 'clsx';
import classes from './Canvas.module.css';
import { useComponentListStore } from '../store/useComponentList';
import { ComponentInfo } from '../types';
import { getConfigByType } from '../components';

const getComponent = (componentInfo: ComponentInfo<Record<string, unknown>>) => {
  const config = getConfigByType(componentInfo.type);
  if (!config) return null;
  const Component = config.Component as FC<unknown>;
  return <Component {...componentInfo.props} />;
};

export const Canvas = () => {
  const { list, setSelectedId, selectedId } = useComponentListStore((state) => ({
    list: state.current,
    setSelectedId: state.setSelectedId,
    selectedId: state.selectedId,
  }));

  function handleComponentClick(e: MouseEvent, id: string) {
    e.stopPropagation();
    setSelectedId(id);
  }

  return (
    <div className={classes.canvas}>
      {list
        .filter((component) => component.isVisible)
        .map((component) => {
          const wrapperClass = clsx({
            [classes['component-wrapper']]: true,
            [classes['component-wrapper--active']]: selectedId === component.frontendId,
            [classes['component-wrapper--locked']]: component.isLocked,
          });
          return (
            <div
              className={wrapperClass}
              key={component.frontendId}
              onClick={(e) => handleComponentClick(e, component.frontendId)}
            >
              <div className={classes.component}>{getComponent(component)}</div>
            </div>
          );
        })}
    </div>
  );
};
