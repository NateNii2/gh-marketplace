import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("APP ERROR:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
          <div className="bg-white rounded-2xl shadow p-8 text-center max-w-md w-full">
            <h1 className="text-2xl font-semibold mb-3">
              Something went wrong
            </h1>

            <p className="text-gray-500 mb-6">
              Please refresh the page or try again later.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;