import React from 'react'

import { useParams, useLocation } from 'react-router-dom'

//  component
import { ContactItem } from '../ContactItem'
import { Error } from '../Error'

//
const dummy = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    // ...
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
}

export const ContactDetail: React.FC<{}> = () => {
  const { id: contactId } = useParams()
  const location = useLocation()

  return location.key !== 'default' ? (
    <div className="component-contact-detail bg-red-500 w-full px-4 py-8 md:p-8">
      <div className="mb-8">
        <ContactItem
          image={dummy.image}
          name={dummy.name}
          id={Number(contactId)}
          type="header"
        />
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
