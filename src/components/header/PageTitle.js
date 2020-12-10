import React from 'react';
import './PageTitle.css'

export default function PageTitle(props) {
  return (
    <div className="hero-page-title">
      {props.children}
    </div>
  )
}
