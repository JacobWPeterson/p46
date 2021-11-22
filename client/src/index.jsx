import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import Workspace from './components/Workspace/index.jsx';
import Help from './components/Help/index.jsx';
import About from './components/About.jsx';

const root = document.getElementById('app');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="help" element={<Help />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  root,
);
