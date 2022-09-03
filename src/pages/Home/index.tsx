import React from 'react'

import { SideMenu } from '../../components/SideMenu'

export const Home: React.FC<{}> = () => {
  return (
    <div className="home flex h-full">
      <SideMenu />
    </div>
  )
}
