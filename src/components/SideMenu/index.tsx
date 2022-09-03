import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export const SideMenu: React.FC<{}> = () => {
  return (
    <>
      <div className="component-side-menu flex flex-col h-full min-w-[100px] p-6 text-center bg-black text-white">
        <Link to="/" className="p-2 mb-5 font-bold text-xl">
          Rick and Morty
        </Link>
        <Link to="/contact" className="p-2 hover:text-sky-700">
          Contact
        </Link>
      </div>
      <Outlet />
    </>
  )
}
