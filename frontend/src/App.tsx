import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage, LoginPage } from './pages';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
);

export default App;
