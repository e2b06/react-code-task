import React from 'react'

import { useParams } from 'react-router-dom'

//  component
import { ContactItem } from '../ContactItem'

//
const dummy = [
  {
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
  },
]

export const ContactDetail: React.FC<{}> = () => {
  const { id: contactId } = useParams()

  return (
    <div className="component-contact-detail bg-red-500 w-full">
      {/* <div className="min-h-[400px]"> */}
      <ContactItem
        image={dummy[0].image}
        name={dummy[0].name}
        id={Number(contactId)}
        type="header"
      />
      {/* </div> */}
    </div>
  )
}
