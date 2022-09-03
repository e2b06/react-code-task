import React from 'react'

import { useParams } from 'react-router-dom'

//  component
import { ContactItem } from '../ContactItem'

export const ContactDetail: React.FC<{}> = () => {
  const { id: contactId } = useParams()

  return (
    <div className="component-contact-detail">
      <></>
      <ContactItem imgUrl="test" name="tommy" id={Number(contactId)} />
    </div>
  )
}
