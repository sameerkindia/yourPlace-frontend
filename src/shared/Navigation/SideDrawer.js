import ReactDOM from "react-dom";

import "./SideDrawer.css";
// import { CSSTransition } from "react-transition-group";

function SideDrawer({ children, onClick }) {
  const content = (
    <aside className="side-drawer slide-in-left" onClick={onClick}>
      {children}
    </aside>
  );

  //   <CSSTransition
  //   in={istrue}
  //   timeout={200}
  //   classNames="slide-in-left"
  //   mountOnEnter
  //   unmountOnExit
  // >
  // </CSSTransition>

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}

export default SideDrawer;
