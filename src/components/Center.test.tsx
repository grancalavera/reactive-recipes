import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Center } from './Center'

describe('Center', () => {
  it('should render children inside a div with center class', () => {
    render(
      <Center>
        <span>Test content</span>
      </Center>
    )

    const centerDiv = screen.getByText('Test content').parentElement
    expect(centerDiv).toHaveClass('center')
  })

  it('should render multiple children', () => {
    render(
      <Center>
        <span>First child</span>
        <span>Second child</span>
      </Center>
    )

    expect(screen.getByText('First child')).toBeInTheDocument()
    expect(screen.getByText('Second child')).toBeInTheDocument()
  })
})