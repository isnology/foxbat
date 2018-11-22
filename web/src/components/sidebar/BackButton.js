import React from 'react'

export default function BackButton({ onBack }) {
  return (
    <span className="btn--x" onClick={ onBack }>&#8701;</span>
  )
}
