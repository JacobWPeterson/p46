import { render, screen, waitFor } from '@testing-library/react';

import { router, Routes } from './Routes';

describe('Routes', () => {
  it('should load the deferred Bibliography route', async () => {
    await router.navigate('/bibliography');
    render(<Routes />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Bibliography' })).toBeInTheDocument();
    });
  });
});
