import { render, screen } from '@testing-library/react';

import { Guide } from './Guide';

describe('Guide', () => {
  it('should render correctly', () => {
    render(<Guide />);

    expect(screen.getByRole('heading', { level: 1, name: 'Guide' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Introduction' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Sigla' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Image viewer' })).toBeInTheDocument();
  });
});
