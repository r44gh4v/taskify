import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{
        style: { fontSize: '0.9rem' },
        success: { style: { background: '#ecfdf5' } },
        error: { style: { background: '#fffbeb' } },
      }} />
      <main className='min-h-screen bg-gray-50 text-gray-900'>
        <Outlet />
      </main>
    </>
  );
}
export default App;