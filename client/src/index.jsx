import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Transcribe from './components/Transcribe.jsx';

const root = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <Transcribe />
  </BrowserRouter>,
  root
);
