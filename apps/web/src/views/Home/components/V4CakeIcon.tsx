import { Link } from '@pancakeswap/uikit'
import throttle from 'lodash/throttle'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const Container = styled(Link)<{ hasScrollToTopButton: boolean }>`
  position: fixed;
  right: 18px;
  transition: 0.2s;
  width: 48px;
  height: 48px;
  bottom: ${({ hasScrollToTopButton }) =>
    hasScrollToTopButton ? 'calc(170px + env(safe-area-inset-bottom))' : 'calc(82px + env(safe-area-inset-bottom))'};
`

export const V4CakeIcon = () => {
  const [hasScrollToTopButton, setHasScrollToTopButton] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop
      if (scrolled > 500) {
        setHasScrollToTopButton(true)
      } else if (scrolled <= 500) {
        setHasScrollToTopButton(false)
      }
    }

    const throttledToggleVisible = throttle(toggleVisible, 200)

    window.addEventListener('scroll', throttledToggleVisible)

    return () => window.removeEventListener('scroll', throttledToggleVisible)
  }, [])

  return (
    <NextLink href="/v4" passHref>
      <Container hasScrollToTopButton={hasScrollToTopButton} href="replace">
        <img
          src={`https://riposoconcept.com/wp-content/uploads/2024/04/BST-Trading-logo-01.png`}
          alt="introducing-v4-icon"
          width={48}
          height={48}
        />
      </Container>
    </NextLink>
  )
}
