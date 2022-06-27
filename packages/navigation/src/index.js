import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const App = () => {
  return (
    <ul className="text-center">
      <li className="py-1">
        <Link
          to="/"
          className="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
        >
          Home
        </Link>
      </li>
      <li className="py-1">
        <Link
          to="/react"
          className="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
        >
          App Store
        </Link>
      </li>
    </ul>
  );
};

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Root;
