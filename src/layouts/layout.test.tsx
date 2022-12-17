import { render, screen, within } from '@testing-library/react';

import BaseLayout from './layout.comp';

describe('Main template', () => {
  describe('Render method', () => {
    it('should have 3 menu items', () => {
      render(<BaseLayout meta={null}>{null}</BaseLayout>);

      const menuItemList = screen.getAllByRole('listitem');

      expect(menuItemList).toHaveLength(3);
    });

    it('should have a link to support creativedesignsguru.com', () => {
      render(<BaseLayout meta={null}>{null}</BaseLayout>);

      const copyrightSection = screen.getByText(/© Copyright/);
      const copyrightLink = within(copyrightSection).getByRole('link');
      expect(copyrightLink).toHaveAttribute(
        'href',
        'https://creativedesignsguru.com'
      );
    });
  });
});
