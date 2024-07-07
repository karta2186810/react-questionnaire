import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { ComponentConfig, ComponentInfo } from '../types';
import { WritableDraft } from 'immer';

type Component = ComponentInfo<Record<string, unknown>>;
type ComponentList = Component[];
type ComponentListStore = {
  selectedId: string;
  previous: ComponentList[];
  current: ComponentList;
  forward: ComponentList[];
  copiedComponent: Component | null;
  setSelectedId: (id: string) => void;
  setList: (list: ComponentList) => void;
  resetList: (list: ComponentList) => void;
  undo: () => void;
  redo: () => void;
  addComponent: (config: ComponentConfig<Record<string, unknown>>) => void;
  updateComponent: (id: string, newProps: Partial<Pick<Component, 'isLocked' | 'isVisible' | 'title'>>) => void;
  updateComponentProps: (id: string, newProps: Record<string, unknown>) => void;
  toggleComponentVisible: (id: string, isVisible: boolean) => void;
  toggleComponentLock: (id: string, isLocked: boolean) => void;
  copyComponent: (id: string) => void;
  pasteComponent: () => void;
  removeComponent: (id: string) => void;
  selectComponent: (direction: 'prev' | 'next') => void;
};

const TRACKING_STEP = 20;
let isTracking = false;

function insertComponent(state: WritableDraft<ComponentListStore>, newComponent: Component) {
  const selectedId = state.selectedId;
  const targetIndex = state.current.findIndex((component) => component.frontendId === selectedId);
  state.selectedId = newComponent.frontendId;
  if (targetIndex !== -1) {
    state.current.splice(targetIndex + 1, 0, newComponent);
  } else {
    state.current.push(newComponent);
  }
}

export const useComponentListStore = create<ComponentListStore>()(
  subscribeWithSelector(
    immer((set) => ({
      selectedId: '',
      previous: [],
      current: [],
      forward: [],
      copiedComponent: null,
      setSelectedId(id) {
        set((state) => {
          state.selectedId = id;
        });
      },
      resetList(list = []) {
        set((state) => {
          state.previous = [];
          state.current = list;
          state.forward = [];
        });
      },
      setList(list) {
        isTracking = true;
        set((state) => {
          state.current = list;
        });
      },
      addComponent(config) {
        isTracking = true;
        set((state) => {
          const newComponent = {
            frontendId: nanoid(),
            title: config.title,
            type: config.type,
            props: { ...config.defaultProps },
            Component: config.Component,
            isLocked: false,
            isVisible: true,
          };
          insertComponent(state, newComponent);
        });
      },
      removeComponent(id) {
        set((state) => {
          const targetIndex = state.current.findIndex((component) => component.frontendId === id);
          if (targetIndex === -1) return;
          if (targetIndex === state.current.length - 1) {
            state.selectedId = state.current[targetIndex - 1].frontendId;
          } else {
            state.selectedId = state.current[targetIndex + 1].frontendId;
          }
          state.current.splice(targetIndex, 1);
        });
      },
      updateComponent(id, newProps) {
        set((state) => {
          const index = state.current.findIndex((c) => c.frontendId === id);
          state.current[index] = {
            ...state.current[index],
            ...newProps,
          };
        });
      },
      updateComponentProps(id, newProps) {
        set((state) => {
          const index = state.current.findIndex((c) => c.frontendId === id);
          state.current[index].props = { ...state.current[index].props, ...newProps };
        });
      },
      toggleComponentVisible(id, isVisible) {
        set((state) => {
          const targetIndex = state.current.findIndex((c) => c.frontendId === id);
          state.current[targetIndex].isVisible = isVisible;
          if (isVisible) {
            state.selectedId = id;
          } else {
            if (state.selectedId === id) {
              let nextVisibleIndex = (targetIndex + 1) % state.current.length;

              while (nextVisibleIndex !== targetIndex) {
                if (state.current[nextVisibleIndex].isVisible) {
                  state.selectedId = state.current[nextVisibleIndex].frontendId;
                  return;
                }
                nextVisibleIndex = (nextVisibleIndex + 1) % state.current.length;
              }
              state.selectedId = '';
            }
          }
        });
      },
      toggleComponentLock(id, isLocked) {
        set((state) => {
          const targetIndex = state.current.findIndex((c) => c.frontendId === id);
          if (targetIndex !== -1) state.current[targetIndex].isLocked = isLocked;
        });
      },
      copyComponent(id) {
        set((state) => {
          const targetIndex = state.current.findIndex((c) => c.frontendId === id);
          if (targetIndex === -1) return;
          state.copiedComponent = state.current[targetIndex];
        });
      },
      pasteComponent() {
        set((state) => {
          if (!state.copiedComponent) return;
          const copiedComponent = JSON.parse(JSON.stringify(state.copiedComponent)) as Component;
          copiedComponent.frontendId = nanoid();
          copiedComponent.isLocked = false;
          copiedComponent.isVisible = true;
          insertComponent(state, copiedComponent);
        });
      },
      selectComponent(direction) {
        set((state) => {
          if (!state.selectedId) return;
          const targetIndex = state.current.findIndex((c) => c.frontendId === state.selectedId);
          if (targetIndex === -1) return;
          const length = state.current.length;
          switch (direction) {
            case 'prev':
              state.selectedId =
                targetIndex - 1 < 0
                  ? state.current[state.current.length - 1].frontendId
                  : state.current[targetIndex - 1].frontendId;
              break;
            case 'next':
              state.selectedId = state.current[(targetIndex + 1) % length].frontendId;
              break;
          }
        });
      },
      undo() {
        set((state) => {
          if (!state.previous.length) return;
          state.forward.push(state.current);
          state.current = state.previous.pop()!;
        });
      },
      redo() {
        set((state) => {
          if (!state.forward.length) return;
          state.previous.push(state.current);
          state.current = state.forward.pop()!;
        });
      },
    })),
  ),
);
useComponentListStore.subscribe(
  (state) => state.current,
  (_, prevCurrent) => {
    if (isTracking) return;

    useComponentListStore.setState((state) => {
      state.previous.push(prevCurrent);
      state.previous = state.previous.slice(TRACKING_STEP * -1);
    });

    isTracking = false;
  },
);
