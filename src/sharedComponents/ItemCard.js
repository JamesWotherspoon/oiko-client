import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ItemCard({ title, children, subtitle, className }) {
  return (
    <>
      <div className={`card ${className}`}>
        <div className="card-header">
          <h3>{title}</h3>
          <p className='card-subtitle'>{subtitle}</p>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}
