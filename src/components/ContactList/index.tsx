import React, { useState, useEffect, useRef } from 'react'

import { ContactItem } from '../ContactItem'

const dummyList = [
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
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: 2,
    name: 'Rick Tommy',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 3,
    name: 'She Mary',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 4,
    name: 'Hello World',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
]

export const ContactList: React.FC<{}> = () => {
  const [contactList, SetContactList] = useState(dummyList)
  const [searchInput, SetSearchInput] = useState('')

  //  contact list by fetching
  const contactListRef = useRef<null | any>(null)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)

    SetSearchInput(event.target.value)
  }

  useEffect(() => {
    //  fetch api
    //  do something

    contactListRef.current = contactList
  }, [])

  //  Change contact list in every search
  useEffect(() => {
    if (!contactListRef.current) return

    const contactListInstance = [...contactListRef.current]

    const filteredContactList = contactListInstance.filter((contact) => {
      const formatString = (value: string) => {
        return value.toLowerCase().replace(' ', '')
      }
      const formatedSearchInput = formatString(searchInput)
      const formatedName = formatString(contact.name)

      return formatedName.includes(formatedSearchInput)
    })

    SetContactList(filteredContactList)
  }, [searchInput])

  return (
    <>
      <div className="contact-list bg-sky-500">
        <div className="p-6">
          <h1 className="mb-4">Contact</h1>
          <input
            type="text"
            placeholder="Saerch Characters"
            value={searchInput}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-5 p-5">
          <></>
          {contactList &&
            contactList.map(({ name, image, species, id }, index) => {
              return (
                <React.Fragment key={index}>
                  <ContactItem
                    name={name}
                    imgUrl={image}
                    species={species}
                    id={id}
                  />
                </React.Fragment>
              )
            })}
        </div>
      </div>
    </>
  )
}
