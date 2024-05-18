import { useComponentListStore } from '../store/useComponentList';
export const useSelectedComponent = () => {
  const selectedComponent = useComponentListStore((state) => {
    return state.current.find((component) => component.frontendId === state.selectedId) ?? null;
  });

  return selectedComponent;
};
