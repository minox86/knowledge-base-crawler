import { create } from 'zustand';
import { DataSource } from '@knowledge-crawler/types';

interface AppState {
  // Data Sources
  dataSources: DataSource[];
  isLoadingDataSources: boolean;

  // UI State
  sidebarOpen: boolean;

  // Actions
  setDataSources: (sources: DataSource[]) => void;
  setLoadingDataSources: (loading: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  dataSources: [],
  isLoadingDataSources: false,
  sidebarOpen: true,

  // Actions
  setDataSources: (sources) => set({ dataSources: sources }),
  setLoadingDataSources: (loading) => set({ isLoadingDataSources: loading }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
