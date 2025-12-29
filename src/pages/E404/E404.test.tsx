import { render, screen } from '@testing-library/react';

import { E404 } from './E404';

describe('E404', () => {
  it('should render correctly', () => {
    render(<E404 />);

    expect(screen.getByText('Οοπς, παγε νοτ φουνδ!')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Home' })).toBeEnabled();
  });
});
