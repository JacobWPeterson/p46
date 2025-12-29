import type { PropsWithChildren, ReactElement } from 'react';
import { createPortal } from 'react-dom';

const createWrapperAndAppendToBody = (wrapperId: string): HTMLDivElement => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

interface PortalProps {
  wrapperId?: string;
}

export const Portal = ({
  children,
  wrapperId = 'portal-wrapper'
}: PropsWithChildren<PortalProps>): ReactElement => {
  let element = document.getElementById(wrapperId);
  // create and append to body
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(children, element);
};
