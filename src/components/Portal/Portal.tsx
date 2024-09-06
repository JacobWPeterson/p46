import type { PropsWithChildren, ReactElement } from "react";
import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (wrapperId: string): HTMLDivElement => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

interface PortalProps {
  wrapperId?: string;
}

export const Portal = ({
  children,
  wrapperId = "portal-wrapper",
}: PropsWithChildren<PortalProps>): ReactElement => {
  const [wrapperElement, setWrapperElement] = useState<Element>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement);
};
