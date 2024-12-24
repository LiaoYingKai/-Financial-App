import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import Overview from '@/pages/Overview.tsx';
import PageNotFound from '@/pages/PageNotFound';
import Profile from '@/pages/Profile.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
