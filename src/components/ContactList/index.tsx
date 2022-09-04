import React, { useState, useEffect, useRef } from 'react'
import { ContactItem } from '../ContactItem'
import { Loading } from '../Loading'

const type = 'character'
const currentPage = 1
const apiPath = `https://rickandmortyapi.com/api/${type}?page=${currentPage}`

export const ContactList: React.FC<{}> = () => {
  const [contactList, SetContactList] = useState([] as any[])
  const [searchInput, SetSearchInput] = useState('')
  const [isLoading, SetIsloading] = useState(false)

  //  contact list by fetching
  const contactListRef = useRef<null | any[]>(null)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetSearchInput(event.target.value)
  }

  //  fetch data
  useEffect(() => {
    const fetchContactList = async () => {
      let result = [] as any[]

      try {
        SetIsloading(true)

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
        alert('something error...')

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
        return value.toLowerCase().replaceAll(' ', '')
      }
      const formatedSearchInput = formatString(searchInput)
      const formatedName = formatString(name)

      return formatedName.includes(formatedSearchInput)
    })

    SetContactList(filteredContactList)
  }, [searchInput])

  return (
    <>
      <div className="component-contact-list w-full bg-sky-500 overflow-auto">
        <div className="p-6">
          <h1 className="mb-4 font-bold text-xl">Contact</h1>

          <input
            type="text"
            className="p-1 rounded-md w-full text-sky-500"
            placeholder="Saerch Characters"
            value={searchInput}
            onChange={onChange}
          />
        </div>

        {isLoading && <Loading />}

        {contactList && contactList.length !== 0 && (
          <div className="grid gap-7 p-5">
            {contactList.map((contact, index) => {
              return (
                <React.Fragment key={index}>
                  <ContactItem contact={contact} type="link" />
                </React.Fragment>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
