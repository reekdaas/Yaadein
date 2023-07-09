import { useEffect, useRef } from "react";

export const useDetectOutsideClick = (setter) => {
  let node = useRef();

  let handleOutsideClick = (e) => {
    if (node && !node?.current?.contains(e.target)) setter();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  return node;
};
