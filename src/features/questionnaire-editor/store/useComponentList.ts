import { create } from 'zustand';
import { subscribeWithSelector, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { ComponentConfig, ComponentInfo } from '../types';
import { WritableDraft } from 'immer';

type ComponentListStore = {
  isTracking: boolean;
  selectedId: string;
  listVersion: string;
  previous: ComponentInfo[][];
  current: ComponentInfo[];
  forward: ComponentInfo[][];
  copiedComponent: ComponentInfo | null;
  setSelectedId: (id: string) => void;
  setList: (list: ComponentInfo[]) => void;
  resetList: (list: ComponentInfo[]) => void;
  undo: () => void;
  redo: () => void;
  addComponent: (config: ComponentConfig<Record<string, unknown>>) => void;
  updateComponent: (id: string, newProps: Partial<Pick<ComponentInfo, 'isLocked' | 'isVisible' | 'title'>>) => void;
  updateComponentProps: (id: string, newProps: Record<string, unknown>) => void;
  toggleComponentVisible: (id: string, isVisible: boolean) => void;
  toggleComponentLock: (id: string, isLocked: boolean) => void;
  copyComponent: (id: string) => void;
  pasteComponent: () => void;
  removeComponent: (id: string) => void;
  selectComponent: (direction: 'prev' | 'next') => void;
};

const TRACKING_STEP = 20;

function insertComponent(state: WritableDraft<ComponentListStore>, newComponent: ComponentInfo) {
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
  devtools(
    subscribeWithSelector(
      immer((set) => ({
        isTracking: true,
        selectedId: '',
        previous: [],
        current: [],
        forward: [],
        // 當前組件列表版本號，用於刷新組件屬性表單
        listVersion: nanoid(),
        copiedComponent: null,
        setSelectedId(id) {
          set((state) => {
            state.selectedId = id;
          });
        },
        resetList(list = []) {
          set((state) => {
            state.isTracking = false;
            state.previous = [];
            state.current = list;
            state.forward = [];
          });
        },
        setList(list) {
          set((state) => {
            state.current = list;
          });
        },
        addComponent(config) {
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
            const copiedComponent = JSON.parse(JSON.stringify(state.copiedComponent)) as ComponentInfo;
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

            state.isTracking = false;
            state.forward.push(JSON.parse(JSON.stringify(state.current)) as ComponentInfo[]);
            state.current = state.previous.pop()!;
            state.listVersion = nanoid();
          });
        },
        redo() {
          set((state) => {
            if (!state.forward.length) return;
            state.listVersion = nanoid();
            state.isTracking = false;
            state.previous.push(JSON.parse(JSON.stringify(state.current)) as ComponentInfo[]);
            state.current = state.forward.pop()!;
            state.listVersion = nanoid();
          });
        },
      })),
    ),
    { enabled: true, name: 'ComponentList' },
  ),
);
useComponentListStore.subscribe(
  (state) => state.current,
  (_, prevComponentList) => {
    useComponentListStore.setState((state) => {
      if (state.isTracking) {
        state.previous.push(JSON.parse(JSON.stringify(prevComponentList)));
        state.previous = state.previous.slice(TRACKING_STEP * -1);
      }

      state.isTracking = true;
    });
  },
);
