import React from 'react'
import  { XIcon } from '@heroicons/react/outline'

export function Character({character, onClick, onRemove}) {
  const {id, name, thumbnail, image} = character

  return (
    <div className='relative'>
      <img
        className='rounded border-2 border-slate-200 w-24 h-24'
        src={thumbnail}
        alt={name}
        onClick={() => onClick ? onClick(character) : null}
      />
      { onRemove &&
        <button
          className='absolute w-5 right-0 top-0 bg-slate-100 rounded-full'
          onClick={() => onRemove(id)}
        ><XIcon /></button>
      }
    </div>
  )

}