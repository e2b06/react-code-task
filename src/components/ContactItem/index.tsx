import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

interface ContactItemProps {
  image: string
  name: string
  type: 'link' | 'header'
  species?: string
  id?: number
}

const style = {
  header: {
    icon: 'w-auto max-h-[150px] rounded-full mr-5',
    name: 'font-bold text-2xl',
  },
  link: {
    icon: 'w-auto max-h-[100px] rounded-full mr-5',
    name: '',
  },
}

export const ContactItem: React.FC<ContactItemProps> = ({
  image,
  name,
  species,
  id,
  type,
}) => {
  const commonClass = 'component-contact-item flex items-center bg-sky-700'

  const content = useMemo(() => {
    return (
      <>
        <img src={image} alt="" className={style[type].icon} />
        <div className="mr-5">
          <p className={style[type].name}>{name}</p>
          {species && <p>{species}</p>}
        </div>
      </>
    )
  }, [])

  return type === 'link' ? (
    <NavLink to={`/contact/${id}`} key={id} className={commonClass}>
      {content}
    </NavLink>
  ) : (
    <div className={commonClass}>{content}</div>
  )
}
