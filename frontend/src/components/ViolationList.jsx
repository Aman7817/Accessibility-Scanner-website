// src/components/ViolationList.jsx
import React from 'react';
import ViolationItem from './violationItem.jsx';

export default function ViolationList({ violations }) {
  return (
    <div>
      {violations.map((violation, idx) => (
        <ViolationItem key={idx} violation={violation} />
      ))}
    </div>
  );
}
