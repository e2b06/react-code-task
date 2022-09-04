import React from 'react'
import { useLocation } from 'react-router-dom'

//  component
import { ContactItem, type ContactRouterState } from '../ContactItem'
import { Error } from '../Error'

export const ContactDetail: React.FC<{}> = () => {
  const location = useLocation()

  const state = location.state as ContactRouterState | null

  return location.key !== 'default' && state ? (
    <div className="component-contact-detail bg-red-500 w-full px-4 py-8 md:p-8">
      <div className="mb-8">
        <ContactItem contact={state?.contact} type="header" />
      </div>
      <div>
        <h1 className="font-bold text-xl">Personal Info</h1>
        <h1></h1>
      </div>
    </div>
  ) : (
    <Error />
  )
}
