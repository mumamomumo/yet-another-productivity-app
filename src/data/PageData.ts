import { PageName, usePageStore } from "@/store/PageStore";

export function savePageData() {
  const page = usePageStore.getState().page;
  localStorage.setItem("page", page);
}

export function loadPageData() {
  const page = localStorage.getItem("page");
  if (page) usePageStore.getState().setPage(page as PageName);
}