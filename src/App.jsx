import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Work from './pages/Work.jsx';
import WorkDetail from './pages/WorkDetail.jsx';
import About from './pages/About.jsx';
import Expertise from './pages/Expertise.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="about" element={<About />} />
        <Route path="expertise" element={<Expertise />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
