import { create } from "zustand";

export type PageName = "home" | "tasks" | "notes";
type pageStore = {
  page: PageName;
  pageProps: any;
  setPage: (page: PageName) => void;
  setPageProps: (props: any) => void;
};

export const usePageStore = create<pageStore>((set) => ({
  page: "home",
  pageProps: null,
  setPage: (page) => set({ page }),
  setPageProps: (props) => set({ pageProps: props }),
}));

export function setPage(page?: "home" | "tasks" | "notes", props?: any): void {
  if (props) usePageStore.getState().setPageProps(props);
  if (page) usePageStore.getState().setPage(page);
}
