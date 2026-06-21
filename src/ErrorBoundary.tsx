import React, { Component } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import arrow from './images/arrow-2.svg'


interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Uncaught error:", error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" replace />;
    }

    if (this.state.hasError) {
      return (
        <div className="error-boundary text-center p-5">
          <h2>Something went wrong 😢</h2>
          <p>Please try again or go back home.</p>


          <button className="theme-btn" onClick={this.handleReset}>
            <i className="icon">
              <a>
                <img src={arrow} alt="" />
              </a>
            </i>
            <i className="link-text">
              <span>Back</span>
              <span>to home</span>
            </i>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;