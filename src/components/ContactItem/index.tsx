import React from 'react'
import { Link } from 'react-router-dom'

const style = {
  header: {
    icon: 'w-auto max-h-[50px] mr-4 rounded-full md:max-h-[150px] md:mr-7',
    name: 'text-md font-bold md:text-2xl',
  },
  link: {
    icon: 'w-auto max-h-[50px] mr-5 rounded-full md:max-h-[100px]',
    name: '',
  },
}

interface ContactItemProps {
  contact: any
  type: 'header' | 'link'
}

export interface ContactRouterState {
  contact: any
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, type }) => {
  const commonClass = 'component-contact-item flex items-center'

  const content = (
    <>
      <img src={contact.image} alt="" className={style[type].icon} />
      <div className="mr-5">
        <p className={style[type].name}>{contact.name}</p>
        {type === 'link' && <p>{contact.species}</p>}
      </div>
    </>
  )

  return type === 'link' ? (
    <Link
      to={`/contact/${contact.id}`}
      key={contact.id}
      className={commonClass}
      state={{ contact } as ContactRouterState}
    >
      {content}
    </Link>
  ) : (
    <div className={commonClass}>{content}</div>
  )
}
