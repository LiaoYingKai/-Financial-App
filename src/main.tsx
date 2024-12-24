import { createRoot } from 'react-dom/client';

import './index.css';
import App from '@/pages/App.tsx';
import { ThemeProvider } from '@/providers/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
);
