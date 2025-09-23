// src/components/ViolationItem.jsx
import React from 'react';

export default function ViolationItem({ violation }) {
  return (
    <div className="border p-4 rounded shadow-sm mb-2">
      <p className="font-semibold text-gray-700">{violation.description}</p>
      {violation.suggestions && violation.suggestions.length > 0 && (
        <>
          <p className="mt-2 font-medium text-gray-600">Fix Suggestions:</p>
          <ul className="list-disc list-inside text-gray-600">
            {violation.suggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
