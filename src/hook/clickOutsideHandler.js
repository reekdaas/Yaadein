import { useEffect, useRef } from "react";

export const useDetectOutsideClick = (setter) => {
  let node = useRef();

  let handleClick = (e) => {
    if (node && !node?.current?.contains(e.target)) setter();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
  return node;
};
