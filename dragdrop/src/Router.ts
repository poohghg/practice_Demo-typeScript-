import Header from "./components/Header";
import drageDrop from "./pages/dragDrap";
import test from "./pages/test";

export interface Routerable {
  path: string;
  name: string;
  view(): void;
}

const routes: Routerable[] = [
  { path: "/", view: drageDrop, name: "메인" },
  { path: "/test", view: test, name: "테스트 페이지" },
];

export const router = () => {
  const $hostElement = document.getElementById("app")! as HTMLDivElement;
  let path: Routerable | undefined = routes.find(
    (route) => location.pathname === route.path,
  );
  if (!path) path = routes[0];
  $hostElement.innerHTML = "";
  const header = new Header(routes);
  path.view();
};

export const navigate = (e: Event, url: string) => {
  console.log("navigate");
  console.log("location.pathname", location.pathname);
  e.preventDefault();
  if (url === location.pathname) return;
  history.pushState(null, "", url);
  router();
};

// const m = document.getElementById("main")! as HTMLButtonElement;
// const t = document.getElementById("test")! as HTMLButtonElement;

// m.addEventListener("click", (e) => navigate(e, "/"));
// t.addEventListener("click", (e) => navigate(e, "/test"));

const R = () => {
  window.onload = () => {
    router();
  };
  window.addEventListener("popstate", router);
};
export default R;
