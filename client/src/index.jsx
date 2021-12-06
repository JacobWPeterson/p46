import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import Workspace from './components/Workspace/index.jsx';
import Glossary from './components/Help/Glossary.jsx';
import Guide from './components/Help/Guide.jsx';
import About from './components/About.jsx';
import E404 from './components/E404.jsx';

const root = document.getElementById('app');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="glossary" element={<Glossary />} />
        <Route path="guide" element={<Guide />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<E404 />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  root,
);
