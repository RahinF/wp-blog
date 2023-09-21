import Post from '@app/post/components/Post';
import { removeHTMLTags } from '@app/utils/removeHTMLTags';
import testData from '@app/utils/testingData/card/data';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';

describe('Post', () => {
  const props = {
    ...testData,
    id: '1',
    tags: { nodes: [] },
    comments: { nodes: [] },
  };

  it('renders title', () => {
    render(<Post post={props} />);
    const title = screen.getByRole('heading', {
      level: 1,
      name: testData.title,
    });
    expect(title).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<Post post={props} />);
    const formattedDate = format(new Date(testData.date), 'do MMMM, yyyy');
    const date = screen.getByText(formattedDate);
    expect(date).toBeInTheDocument();
  });

  it('renders content', () => {
    render(<Post post={props} />);

    const contentWithoutHTMLTags = removeHTMLTags(testData.content);
    const content = screen.getByText(contentWithoutHTMLTags);

    expect(content).toBeInTheDocument();
  });

  it.todo('renders featured image if available');
  it.todo('renders no image if featured image is not available');
  it.todo('renders author image if available');
  it.todo('renders  no image if author image is not available');
  it.todo('renders author name');
  it.todo('renders anonymous if there is no author');
  it.todo('renders reading time icon');
  it.todo('renders reading time text');
});
