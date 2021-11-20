import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Workspace from './Workspace.jsx';
import Guide from './Guide.jsx';
import About from './About.jsx'
import { StyledNav, StyledNavItem, StyledNavLink } from '../styles.js';

const Transcribe = () => (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="guide" element={<Guide />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
);

export default Transcribe;
