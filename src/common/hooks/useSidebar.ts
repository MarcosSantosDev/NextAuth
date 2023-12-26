import { create } from 'zustand'

type Sidebar = {
    expanded: boolean,
    toggleSidebar: () => void,
}

export const useSidebar = create<Sidebar>((set) => ({
    expanded: true,
    toggleSidebar: () => set((state) => ({ expanded: !state.expanded })),
}));