import React from 'react'
import { NavLink } from 'react-router-dom'

interface ContactItemProps {
  imgUrl: string
  name: string
  species?: string
  id: number
}

export const ContactItem: React.FC<ContactItemProps> = ({
  imgUrl,
  name,
  species,
  id,
}) => {
  return (
    <>
      <NavLink
        to={`/contact/${id}`}
        key={id}
        className="component-contact-item flex items-center"
      >
        <img
          src={imgUrl}
          alt=""
          className="w-auto max-h-[100px] rounded-full mr-5"
        />
        <div className="">
          <p>{name}</p>
          {species && <p>{species}</p>}
        </div>
      </NavLink>
    </>
  )
}

// ;<NavLink to={`/contact/${id}`} key={id} className="flex max-h-[150px]">
//   <div className="relative w-full">
//     <img
//       src={imgUrl}
//       alt=""
//       className="absolute top-0 bottom-0 left-0 right-0 w-auto h-full object-contain"
//     />
//   </div>
//   {/* <div className="img-container relative w-full rounded-full overflow-hidden bg-black">
//   <img
//     src={imgUrl}
//     alt=""
//     className="absolute top-0 bottom-0 left-0 right-0 w-auto h-full object-cover"
//     // className="w-auto h-full"
//   />
// </div> */}
//   <div>
//     <p>{name}</p>
//     {species && <p>{species}</p>}
//   </div>
// </NavLink>
