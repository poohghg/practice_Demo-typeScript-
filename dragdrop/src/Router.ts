import Header from "./components/Header";
import drageDrop from "./pages/dragDrap";
import map from "./pages/map";
import test from "./pages/test";

export interface Routerable {
  path: string;
  name: string;
  view(): void;
}

const routes: Routerable[] = [
  { path: "/", view: map, name: "구글맵 테스트" },
  // { path: "/", view: drageDrop, name: "메인" },
  { path: "/dragDrop", view: drageDrop, name: "드래그드랍" },
  // { path: "/test", view: test, name: "테스트 페이지" },
];

export const router = () => {
  const $hostElement = document.getElementById("app")! as HTMLDivElement;
  // const $contentElement = document.createElement("div")! as HTMLDivElement;
  let path: Routerable | undefined = routes.find(
    (route) => location.pathname === route.path,
  );
  if (!path) path = routes[0];
  $hostElement.innerHTML = "";
  new Header(routes);
  // main content 영역으로 설정
  path.view();
};

export const navigate = (e: Event, url: string) => {
  e.preventDefault();
  if (url === location.pathname) return;
  history.pushState(null, "", url);
  router();
};

const R = () => {
  window.onload = () => {
    router();
    // new Header(routes);
  };
  window.addEventListener("popstate", router);
  console.log("2");
};
export default R;
