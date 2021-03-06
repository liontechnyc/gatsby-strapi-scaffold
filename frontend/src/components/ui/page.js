import React  from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import flow from "lodash/flow"

import {
  withScrollToTop,
  withNotifications,
  withCookiesAlert
} from "../../lib/ui"

import { 
  containerLayoutType,
  navJustificationType
} from "../../lib/propTypes"

import useSiteMenu from "../../hooks/use-site-menu"
import useSiteMetadata from "../../hooks/use-site-metadata"

import Footer from "./footer"
import {
  Navbar,
  Menu
} from "../navigation"

import "./page.scss"

/**
 * ? Flexible page layout to structure navigation and content  
 */
const Page = ({ 
    pageLayout, 
    contentLayout, 
    contentSpacing,
    justifyNavContent, 
    navPlacement,
    hideFooter,
    children 
  }) => {
  const { 
    menuIsVisible, 
    setMenuVisibility 
  } = useSiteMenu()
  const { 
    title,
    author, 
    facebook,
    instagram,  
    linkedin
  } = useSiteMetadata()
  const social = { facebook, instagram, linkedin }
  const pageLayoutClass = cx("page__layout", { 
    "is-vertical" : pageLayout === 'vertical',
    "is-horizontal" : pageLayout === 'horizontal'
  })
  const navigationClass = cx("page__navigation", {
    "is-fixed" : navPlacement === 'fixed',
    "is-sticky" : navPlacement === 'sticky',
    "is-absolute" : navPlacement === 'absolute'
  })
  const navigationContainerClass = cx("page__navigation--container", {
    "is-horizontal" : pageLayout === 'vertical',
    "is-vertical" : pageLayout === 'horizontal'
  })
  const contentContainerClass = cx("page__content--container", {
    "is-horizontal" : contentLayout === 'horizontal',
    "is-vertical" : contentLayout === 'vertical',
    "is-wide" : contentSpacing === 'wide',
    "is-narrow" : contentSpacing === 'narrow',
    "is-fluid" : contentSpacing === 'fluid'
  })
  const footerClass = cx("page__footer", {
    "is-hidden": hideFooter
  })
  return (
    <div className={pageLayoutClass}>
      {/* Navigation */}
      <nav className={navigationClass}>
        <div className={navigationContainerClass}>
          <Navbar
            header={title}
            social={social}
            openMenu={() => setMenuVisibility(true)}
            pageLayout={pageLayout}
            justifyNavContent={justifyNavContent}
          />
        </div>
        <Menu
          header={title}
          closeMenu={() => setMenuVisibility(false)}
          isVisible={menuIsVisible}
          social={social}
        />
      </nav>
      {/* Page */}
      <div className="page__container">
        {/* Content */}
        <main className={contentContainerClass}>
          { children } {/* Page content */}
        </main>
        {/* Footer */}
        <section className={footerClass}>
          <Footer/>
        </section>
      </div>
    </div>
  )
}

Page.propTypes = {
  pageLayout: containerLayoutType,
  contentLayout: containerLayoutType,
  contentSpacing: PropTypes.oneOf(['wide', 'narrow', 'fluid']),
  justifyNavContent: navJustificationType,
  navPlacement: PropTypes.oneOf([ 'sticky', 'fixed' ]),
  hideFooter: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Page.defaultProps = {
  pageLayout: 'vertical',
  contentLayout: 'vertical',
  justifyNavContent: 'end',
  fluidNav: true
}

export default flow( 
  withScrollToTop,
  withNotifications, 
  withCookiesAlert
)(Page)
