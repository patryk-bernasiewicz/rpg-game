import { Link, Outlet } from 'react-router-dom';

const OutsideLayout = () => (
  <div className="flex flex-col min-h-screen">
    <div className="max-w-[800px] w-full mx-auto">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1>My App</h1>
          <nav>
            <ul className="flex items-center list-none gap-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          © 2023 RPG Game. All rights reserved.
        </div>
      </footer>
    </div>
  </div>
);

export default OutsideLayout;
