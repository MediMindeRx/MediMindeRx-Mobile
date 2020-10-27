import React from 'react'
import renderer from 'react-test-renderer'

import LandingPage from './LandingPage'

jest.useFakeTimers()

describe('LandingPage', () => {
  it('should render without crashing', () => {
    const tree = renderer.create(<LandingPage />);
    expect(tree).toBeDefined()
  });
});