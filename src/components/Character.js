import React from 'react'
import  { XCircleIcon } from '@heroicons/react/solid'
import  { XIcon } from '@heroicons/react/outline'
// import  { XIcon } from '@heroicons/react/solid'
// import  { XCircleIcon } from '@heroicons/react/outline'

export function Character({thumbnail, id, name, onClick, onRemove}) {

  return (
    <div className='relative p-2'>
      <img
        className=''
        src={thumbnail}
        alt={name}
        onClick={() => onClick(id)}
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