import React from 'react'

export const DummyComponent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <div className={`${title} h-full bg-black`}>
        <h1 className="text-white">this is {title} component</h1>
      </div>
    </>
  )
}
