import { Outlet, ScrollRestoration } from 'react-router-dom';
import NavBar from './pages/Shared/NavBar/NavBar';
import Footer from './pages/Shared/Footer/Footer';

function App() {
  return (
    <>
      <div className='max-w-6xl mx-auto'>
        <NavBar />
        <div className='min-h-[calc(100vh-190px)]'>
          <Outlet />
        </div>
      </div>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default App;