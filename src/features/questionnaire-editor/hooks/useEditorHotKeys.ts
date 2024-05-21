import { useHotkeys } from '@mantine/hooks';
import { useComponentListStore } from '../store/useComponentList';
import { useSelectedComponent } from './useSelectedComponent';

export const useEditorHotKeys = () => {
  const selectedComponent = useSelectedComponent();
  const { removeComponent, copyComponent, pasteComponent, toggleComponentLock, selectComponent } =
    useComponentListStore((state) => ({
      removeComponent: state.removeComponent,
      copyComponent: state.copyComponent,
      pasteComponent: state.pasteComponent,
      toggleComponentLock: state.toggleComponentLock,
      selectComponent: state.selectComponent,
    }));

  function removeSelectedElement() {
    if (!selectedComponent) return;
    removeComponent(selectedComponent.frontendId);
  }
  function copySelectedComponent() {
    if (!selectedComponent) return;
    copyComponent(selectedComponent.frontendId);
  }
  function toggleSelectedComponentLock() {
    if (!selectedComponent) return;
    toggleComponentLock(selectedComponent.frontendId, !selectedComponent.isLocked);
  }

  useHotkeys(
    [
      ['Backspace', removeSelectedElement],
      ['Delete', removeSelectedElement],
      ['mod+C', copySelectedComponent],
      ['mod+V', pasteComponent],
      ['mod+L', toggleSelectedComponentLock],
      ['ArrowUp', () => selectComponent('prev')],
      ['ArrowDown', () => selectComponent('next')],
    ],
    undefined,
    false,
  );
};
