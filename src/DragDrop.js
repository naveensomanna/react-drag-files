import React, { useRef, useEffect, useState } from 'react'
import './DragDrop.css'
const DragDrop = props => {
  const dropRef = useRef(null)
  const [dragging, setdragging] = useState(false)
  const [dragCounter, setdragCounter] = useState(0)
  const handleDragIn = event => {
    event.preventDefault()
    event.stopPropagation()
    setdragCounter(dragCounter + 1)
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setdragging(true)
    }
  }
  const handleDragOut = event => {
    event.preventDefault()
    event.stopPropagation()
    setdragCounter(dragCounter - 1)
    if (dragCounter === 0) {
      setdragging(false)
    }
  }
  const handleDrag = event => {
    event.preventDefault()
    event.stopPropagation()
  }
  const handleDrop = event => {
    event.preventDefault()
    event.stopPropagation()
    setdragging(false)
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      props.handleDrop(event.dataTransfer.files)
      event.dataTransfer.clearData()
      setdragCounter(0)
    }
  }
  return (
    <div
      ref={dropRef}
      className='drop-area '
      onDragStart={handleDragIn}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onDragLeave={handleDragOut}
    >
      {dragging && (
        <div
          style={{
            border: 'dashed grey 4px',
            backgroundColor: 'rgba(255,255,255,.8)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              left: 0,
              textAlign: 'center',
              color: 'grey',
              fontSize: 36
            }}
          >
            <div>drop here :)</div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  )
}
export default DragDrop
