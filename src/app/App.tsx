/* eslint import/no-unassigned-import: "off" */
import '../styles/index.scss';

import { createRoot } from 'react-dom/client';

import { Routes } from './Routes';
import { AppWrapper } from './AppWrapper/AppWrapper';

const container = document.getElementById('app');

if (!container) {
  throw new Error('App container not found');
}

const root = createRoot(container);

root.render(
  <AppWrapper>
    <Routes />
  </AppWrapper>
);
