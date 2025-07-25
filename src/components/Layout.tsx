import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 32 }}>
        <h1>My App Layout</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
