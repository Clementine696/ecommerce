import React from 'react'
import Header from '../Header'
import MenuHeader from '../MenuHeader'


function Layout(props) {
  return (
    <>
        <Header />
        <MenuHeader />
        {props.children}
    </>
  )
}

Layout.propTypes = {}

export default Layout
