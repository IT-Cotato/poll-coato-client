import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface ApiErrorBoundaryProps {
  children: ReactNode;
}

function Fallback({ error }: { error: Error }) {
  return (
    <div style={{ color: 'red', padding: 24 }}>
      <h2>API 에러 발생!</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function ApiErrorBoundary({ children }: ApiErrorBoundaryProps) {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
