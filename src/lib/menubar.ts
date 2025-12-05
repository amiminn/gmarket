/**
 * Zustand store for managing the state of a mini bar UI component.
 *
 * @remarks
 * This store persists the `isMiniBar` state in `localStorage` using the key `'isMiniBar'`.
 * The state is initialized from `localStorage` if available, otherwise defaults to `false`.
 *
 * @example
 * // Import the store hook
 * import { useMiniBarStore } from './lib/menubar';
 *
 * // Access state and actions in a React component
 * const isMiniBar = useMiniBarStore((state) => state.isMiniBar);
 * const toggleMiniBar = useMiniBarStore((state) => state.toggleMiniBar);
 * const toggleStaticMiniBar = useMiniBarStore((state) => state.toggleStaticMiniBar);
 *
 * // Use in JSX
 * <button onClick={toggleMiniBar}>
 *   {isMiniBar ? 'Hide Mini Bar' : 'Show Mini Bar'}
 * </button>
 *
 * // Set mini bar state directly
 * <button onClick={() => toggleStaticMiniBar(true)}>
 *   Show Mini Bar
 * </button>
 * <button onClick={() => toggleStaticMiniBar(false)}>
 *   Hide Mini Bar
 * </button>
 */
import { create } from "zustand";

interface MiniBarState {
  isMiniBar: boolean;
  toggleMiniBar: () => void;
  toggleStaticMiniBar: (val: boolean) => void;
}

const MINI_BAR_KEY = "isMiniBar";

const getInitialState = (): boolean => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(MINI_BAR_KEY);
    return stored ? JSON.parse(stored) : false;
  }
  return false;
};

export const useMiniBarStore = create<MiniBarState>((set) => ({
  isMiniBar: getInitialState(),

  toggleMiniBar: () =>
    set((state) => {
      const newValue = !state.isMiniBar;
      if (typeof window !== "undefined") {
        localStorage.setItem(MINI_BAR_KEY, JSON.stringify(newValue));
      }
      return { isMiniBar: newValue };
    }),
  toggleStaticMiniBar: (val: boolean) =>
    set(() => {
      const newValue = val;
      if (typeof window !== "undefined") {
        localStorage.setItem(MINI_BAR_KEY, JSON.stringify(newValue));
      }
      return { isMiniBar: newValue };
    }),
}));

interface SideBarState {
  isSideBar: boolean;
  toggleSideBar: () => void;
  toggleStaticSideBar: (val: boolean) => void;
}

const SIDE_BAR_KEY = "isSideBar";

const getInitialSideBarState = (): boolean => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(SIDE_BAR_KEY);
    return stored ? JSON.parse(stored) : false;
  }
  return false;
};

export const useSideBarStore = create<SideBarState>((set) => ({
  isSideBar: getInitialSideBarState(),
  toggleSideBar: () =>
    set((state) => {
      const newValue = !state.isSideBar;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDE_BAR_KEY, JSON.stringify(newValue));
      }
      return { isSideBar: newValue };
    }),
  toggleStaticSideBar: (val: boolean) =>
    set(() => {
      const newValue = val;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDE_BAR_KEY, JSON.stringify(newValue));
      }
      return { isSideBar: newValue };
    }),
}));

interface PageState {
  namepage: string;
  changeNamePage: (value: string) => void;
}

export const usePageStore = create<PageState>((set) => ({
  namepage: "Default",
  changeNamePage: (value: string) =>
    set(() => ({
      namepage: value,
    })),
}));
