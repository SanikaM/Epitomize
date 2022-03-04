import { render, screen } from '@testing-library/react';
import EditPost from '../Components/EditPost';

describe('Header component', () => {
 test('it renders', () => {
   render(<EditPost />);
   expect(screen.getByText('Add Image')).toBeInTheDocument();
   expect(screen.getByText('Publish')).toBeInTheDocument();
   expect(screen.getByTestId('title') ).toBeInTheDocument();
   expect(screen.getByTestId('tags') ).toBeInTheDocument();
   expect(screen.getByTestId('content') ).toBeInTheDocument();
   expect(screen.getByTestId('summary') ).toBeInTheDocument();
   expect(screen.getByTestId('posttype') ).toBeInTheDocument();

 });
})