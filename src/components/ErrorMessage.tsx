import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps): React.JSX.Element {
  return <div className="max-w-2xl mx-auto px-4 py-2 text-red-600">{message}</div>;
}
