import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { ComponentConfig, ComponentInfo, ComponentProps } from '../types';

type ComponentList = (ComponentInfo & { frontendId: string })[];

type ComponentListStore = {
  selectedId: string;
  previous: ComponentList[];
  current: ComponentList;
  forward: ComponentList[];
  setSelectedId: (id: string) => void;
  resetList: (list: ComponentList) => void;
  undo: () => void;
  redo: () => void;
  addComponent: (config: ComponentConfig) => void;
  updateComponent: (id: string, newProps: Partial<ComponentProps>) => void;
  removeComponent: (id: string) => void;
};

const TRACKING_STEP = 20;
let isTracking = false;

export const useComponentListStore = create<ComponentListStore>()(
  subscribeWithSelector(
    immer((set) => ({
      selectedId: '',
      previous: [],
      current: [],
      forward: [],
      setSelectedId(id: string) {
        set((state) => {
          state.selectedId = id;
        });
      },
      resetList(list: ComponentList = []) {
        set((state) => {
          state.previous = [];
          state.current = list;
          state.forward = [];
        });
      },
      setList(list: ComponentList) {
        isTracking = true;
        set((state) => {
          state.current = list;
        });
      },
      addComponent(config: ComponentConfig) {
        isTracking = true;

        set((state) => {
          const selectedId = state.selectedId;
          const targetIndex = state.current.findIndex((component) => component.frontendId === selectedId);
          const newComponent = {
            frontendId: nanoid(),
            title: config.title,
            type: config.type,
            props: { ...config.defaultProps },
            Component: config.Component,
          };
          state.selectedId = newComponent.frontendId;
          if (targetIndex !== -1) {
            state.current.splice(targetIndex + 1, 0, newComponent);
          } else {
            state.current.push(newComponent);
          }
        });
      },
      removeComponent(id: string) {
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
      updateComponent(id: string, newProps: Partial<ComponentProps>) {
        set((state) => {
          const index = state.current.findIndex((c) => c.frontendId === id);
          state.current[index].props = { ...state.current[index].props, ...newProps };
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
