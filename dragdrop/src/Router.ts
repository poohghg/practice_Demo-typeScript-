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
    // const handleLocationChange = (e: Event) => {
    //   console.log("handleLocationChange");
    //   test();
    //   window.history.pushState(undefined, "", "/main");
    // };

    // // 새오룬 커스텀 이벤트를
    // const locationChangeEvent = new CustomEvent("locationchange", {
    //   composed: true, //웹 컴포넌트라면 넣어주세요
    // });
    // //* 주소변경 이벤트 Dispatch

    // window.addEventListener("locationchange", handleLocationChange);
    // // 동작
    // window.addEventListener("popstate", () => {
    //   window.dispatchEvent(locationChangeEvent);
    //   console.log("popstate");
    // });
  };
  const navigate = (e: Event, url: string) => {
    console.log("navigate");
    console.log("location.pathname", location.pathname);
    e.preventDefault();
    if (url === location.pathname) return;
    history.pushState(null, "", url);
    router();
  };
  window.addEventListener("popstate", router);

  // const m = document.getElementById("main")! as HTMLButtonElement;
  // const t = document.getElementById("test")! as HTMLButtonElement;

  // m.addEventListener("click", (e) => navigate(e, "/"));
  // t.addEventListener("click", (e) => navigate(e, "/test"));
  window.onload = () => {
    router();
  };
};

export default R;
