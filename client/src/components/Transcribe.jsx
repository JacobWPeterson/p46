import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Learn from './Learn.jsx';
import About from './About.jsx'
import { StyledNav, StyledNavItem, StyledNavLink } from '../styles.js';

const Transcribe = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
  );
};

export default Transcribe;
