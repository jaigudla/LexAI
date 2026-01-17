import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="documents/:id" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
