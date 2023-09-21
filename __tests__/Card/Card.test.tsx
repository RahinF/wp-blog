import { calcAvgReadingTime } from '@app/utils/calcAvgReadingTime';
import { removeHTMLTags } from '@app/utils/removeHTMLTags';
import Card from '@components/Card';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import testData from '@utils/testingData/card/data';

describe('Card', () => {
  it('renders title', () => {
    render(<Card {...testData} />);

    const title = screen.getByRole('heading', {
      level: 1,
      name: testData.title,
    });

    expect(title).toBeInTheDocument();
  });

  it('renders title link', () => {
    render(<Card {...testData} />);

    const title = screen.getByRole('link', {
      name: testData.title,
    });

    expect(title).toBeInTheDocument();
  });

  it('renders content', () => {
    render(<Card {...testData} />);

    const content = screen.getByText(removeHTMLTags(testData.content));

    expect(content).toBeInTheDocument();
  });

  it('renders comment count if number is greater than 0', () => {
    render(<Card {...testData} />);

    const commentCount = screen.getByText(testData.commentCount);

    expect(commentCount).toBeInTheDocument();
  });

  it('renders comment count of 0 if null', () => {
    render(
      <Card
        {...testData}
        commentCount={null}
      />,
    );

    const commentCount = screen.getByText(0);

    expect(commentCount).toBeInTheDocument();
  });

  it('renders anonymous text if no author', () => {
    render(
      <Card
        {...testData}
        author={null}
      />,
    );

    const author = screen.getByText(/anonymous/i);

    expect(author).toBeInTheDocument();
  });

  it('renders author', () => {
    render(<Card {...testData} />);

    const link = screen.getByRole('link', {
      name: testData.author.node.name,
    });

    expect(link).toBeInTheDocument();
  });

  it('renders author link href correctly', () => {
    render(<Card {...testData} />);

    const link = screen.getByRole('link', {
      name: testData.author.node.name,
    });

    expect(link).toHaveAttribute('href', `/author/${testData.author.node.id}`);
  });

  it('renders featured image', () => {
    render(<Card {...testData} />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
  });

  it('renders featured image link', () => {
    render(<Card {...testData} />);

    const link = screen.getByRole('link', {
      name: testData.featuredImage.node.altText,
    });

    expect(link).toBeInTheDocument();
  });

  it('renders no link if featured image is null', () => {
    render(
      <Card
        {...testData}
        featuredImage={null}
      />,
    );

    const link = screen.queryByRole('link', {
      name: testData.featuredImage.node.altText,
    });

    expect(link).not.toBeInTheDocument();
  });

  it('renders no image if featured image is null', () => {
    render(
      <Card
        {...testData}
        featuredImage={null}
      />,
    );

    const image = screen.queryByRole('img');

    expect(image).not.toBeInTheDocument();
  });

  it('renders average reading time text', () => {
    render(<Card {...testData} />);

    const readingTime = calcAvgReadingTime(testData.content);

    const readingTimeText = screen.getByText(readingTime);

    expect(readingTimeText).toBeInTheDocument();
  });

  it('renders comment icon', () => {
    render(<Card {...testData} />);

    const icon = screen.getByTestId('icon-comment');

    expect(icon).toBeInTheDocument();
  });

  it('renders reading time icon', () => {
    render(<Card {...testData} />);

    const icon = screen.getByTestId('icon-clock');

    expect(icon).toBeInTheDocument();
  });
});
