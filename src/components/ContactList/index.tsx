import React, { useState, useEffect, useRef } from 'react'

import { ContactItem } from '../ContactItem'
import { Loading } from '../Loading'

const type = 'character'
const currentPage = 1
const apiPath = `https://rickandmortyapi.com/api/${type}?page=${currentPage}`

export const ContactList: React.FC<{}> = () => {
  const [contactList, SetContactList] = useState([])
  const [searchInput, SetSearchInput] = useState('')
  const [isLoading, SetIsloading] = useState(true)

  //  contact list by fetching
  const contactListRef = useRef<null | never[]>(null)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetSearchInput(event.target.value)
  }

  useEffect(() => {
    const fetchContactList = async () => {
      let result = [] as never[]

      try {
        const response = await fetch(apiPath)
        const data = await response.json()

        if (
          response.status < 400 &&
          response.ok &&
          data.hasOwnProperty('results')
        ) {
          result = data.results
        }
      } catch (e) {
        console.log(e)
      } finally {
        SetContactList(result)
        contactListRef.current = result

        SetIsloading(false)
      }
    }

    //  call api
    fetchContactList()
  }, [])

  //  Change contact list in every search
  useEffect(() => {
    if (!contactListRef.current || contactListRef.current.length === 0) return

    const contactListInstance = [...contactListRef.current]

    const filteredContactList = contactListInstance.filter(({ name }) => {
      const formatString = (value: string) => {
        return value.toLowerCase().replace(' ', '')
      }
      const formatedSearchInput = formatString(searchInput)
      const formatedName = formatString(name)

      return formatedName.includes(formatedSearchInput)
    })

    SetContactList(filteredContactList)
  }, [searchInput])

  return (
    <>
      <div className="component-contact-list bg-sky-500 overflow-auto">
        <div className="p-6">
          <h1 className="mb-4 font-bold text-xl">Contact</h1>

          <input
            type="text"
            className="p-1 rounded-md text-sky-500"
            placeholder="Saerch Characters"
            value={searchInput}
            onChange={onChange}
          />
        </div>

        {isLoading && <Loading />}

        {contactList && contactList.length !== 0 && (
          <div className="grid gap-5 p-5">
            {contactList.map(({ name, image, species, id }, index) => {
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
        )}
      </div>
    </>
  )
}
