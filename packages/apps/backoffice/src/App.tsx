import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@/styles/theme';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Dashboard } from '@/pages/Dashboard';
import { DataSources } from '@/pages/DataSources';
import { CrawlerStatus } from '@/pages/CrawlerStatus';
import { Settings } from '@/pages/Settings';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/data-sources" element={<DataSources />} />
            <Route path="/crawler" element={<CrawlerStatus />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
