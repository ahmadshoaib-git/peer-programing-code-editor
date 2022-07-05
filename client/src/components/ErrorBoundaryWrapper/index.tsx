import { ErrorBoundary } from "react-error-boundary";

export interface Props {
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
}

const ErrorBoundaryWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
export default ErrorBoundaryWrapper;
