
import React from 'react'

const Alert = ({message,font,color}) => {
  return (
    <div className='fixed bottom-20 w-full flex justify-center items-center h-fit bg-transparent alertpop z-50 '>
        <div className={`px-8 py-4 text-sm rounded-lg text-center ${font} ${color} w-fit shadow-2xl`}>{message}</div>
    </div>
  )
}

export default Alert