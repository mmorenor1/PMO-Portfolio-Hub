import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@components';
import {
  Dashboard,
  Portfolio,
  Budget,
  Capacity,
  PMSpace,
  Explorer,
  About,
} from '@pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/capacity" element={<Capacity />} />
          <Route path="/pm-space" element={<PMSpace />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
