import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Mainpage } from './components/mainpage/mainpage';
import { Containers } from './components/containers/containers';
// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/container/:id" element={<Containers />} />
        </Routes>
      </Router>
      {/* <Button variant="contained" onClick={fetchAndDisplayResponse}>
        Call backend
      </Button> */}
    </>
  );
}
