import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-red-500 p-4">
              <h2 className="text-white text-xl font-bold">Something went wrong</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                An error occurred while rendering this application.
              </p>
              {this.state.error && (
                <div className="bg-gray-100 p-4 rounded overflow-auto max-h-64 mb-4 border border-gray-200">
                  <p className="text-red-600 font-mono text-sm font-semibold">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
              {this.state.errorInfo && (
                 <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">Stack Trace</summary>
                    <pre className="mt-2 text-xs text-gray-500 overflow-auto whitespace-pre-wrap p-2 bg-gray-50 rounded">
                        {this.state.errorInfo.componentStack}
                    </pre>
                 </details>
              )}
              <button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
