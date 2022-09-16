import drageDrop from "./pages/dragDrap";
import test from "./pages/test";

const R = () => {
  const router = () => {
    const routes = [
      { path: "/", view: drageDrop },
      { path: "/test", view: test },
    ];

    let path = routes.find((route) => location.pathname === route.path);
    if (!path) path = routes[0];
    console.log("t");
    path.view();
  };
  const navigate = (e: Event, url: string) => {
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
  window.addEventListener("popstate", router);
  window.onload = () => {
    router();
  };
};

export default R;
