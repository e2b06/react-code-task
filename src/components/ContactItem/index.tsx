import React from 'react'
import { Link } from 'react-router-dom'

interface ContactItemProps {
  image: string
  name: string
  type: 'link' | 'header'
  species?: string
  id?: number
}

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

export const ContactItem: React.FC<ContactItemProps> = ({
  image,
  name,
  species,
  id,
  type,
}) => {
  const commonClass = 'component-contact-item flex items-center'

  const content = (
    <>
      <img src={image} alt="" className={style[type].icon} />
      <div className="mr-5">
        <p className={style[type].name}>{name}</p>
        {species && <p>{species}</p>}
      </div>
    </>
  )

  return type === 'link' ? (
    <Link to={`/contact/${id}`} key={id} className={commonClass}>
      {content}
    </Link>
  ) : (
    <div className={commonClass}>{content}</div>
  )
}
