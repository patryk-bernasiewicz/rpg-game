import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { GameLayout, OutsideLayout } from './components/Layouts';
import {
  ForgotPasswordPage,
  GamePage,
  HomePage,
  LoginPage,
  RegisterPage,
} from './pages';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<OutsideLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />\
        <Route path="forgot-password" element={<ForgotPasswordPage />} />\
      </Route>
      <Route path="/game" element={<GameLayout />}>
        <Route index element={<GamePage />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
