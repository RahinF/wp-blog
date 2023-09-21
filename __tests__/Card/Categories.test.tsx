import Categories from '@app/components/Card/Categories';
import config from '@components/Card/config';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import testData from '@utils/testingData/card/data';

describe('Categories', () => {
  const categories = testData.categories.nodes;

  it('renders links with a max of 2', () => {
    render(<Categories categories={categories} />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(config.TAGS_DISPLAY_COUNT);

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  it.todo('renders links with correct href');
});
