import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

//  component
import { ContactItem, ContactRouterState } from '../ContactItem'
import { Loading } from '../Loading'
import { Error } from '../Error'

const TableSpan: React.FC<{ text: string }> = ({ text }) => {
  return <p className="grid-span-1 text-center">{text}</p>
}

export const ContactDetail: React.FC<{}> = () => {
  const location = useLocation()

  const state = location.state as ContactRouterState | null

  const [episodeList, SetEpisodeList] = useState([] as any[])
  const [isLoading, SetIsLoading] = useState(false)

  useEffect(() => {
    if (!state) return

    const fetchEpisodeList = async (path: string) => {
      let result = {}

      try {
        SetIsLoading(true)

        const response = await fetch(`${path}`)
        const data = await response.json()

        if (
          response.status < 400 &&
          response.ok &&
          !data.hasOwnProperty('error')
        ) {
          result = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        SetEpisodeList((preList) => {
          return Object.keys(result).length === 0
            ? preList
            : [...preList, result]
        })

        SetIsLoading(false)
      }
    }

    for (let index = 0; index < state.contact.episode.length; index++) {
      const path = state.contact.episode[index]
      fetchEpisodeList(path)
    }
  }, [])

  return location.key !== 'default' && state ? (
    <div className="component-contact-detail bg-yellow-500 w-full px-4 py-8 md:p-8 overflow-auto">
      <div className="mb-8">
        <ContactItem contact={state.contact} type="header" />
      </div>
      <div className="mb-5">
        <h1 className="mb-5 font-bold text-xl">Personal Info</h1>
        <h1>Status: {state.contact.status}</h1>
        <h1>Gender: {state.contact.gender}</h1>
        <h1>Species: {state.contact.species}</h1>
        <h1>Location: {state.contact.location.name}</h1>
        <h1>Origin: {state.contact.origin.name}</h1>
        <h1>Created Date: {state.contact.created}</h1>
      </div>

      {isLoading && <Loading />}

      {episodeList && episodeList.length !== 0 && (
        <>
          <h1 className="mb-5 font-bold text-xl">Epsiode</h1>
          <div className="grid grid-cols-4 gap-3 items-center md:gap-5">
            {episodeList.map(({ name, air_date, episode, created }, index) => {
              return (
                <React.Fragment key={index}>
                  <TableSpan text={name} />
                  <TableSpan text={air_date} />
                  <TableSpan text={episode} />
                  <TableSpan text={created} />
                </React.Fragment>
              )
            })}
          </div>
        </>
      )}
    </div>
  ) : (
    <Error />
  )
}
