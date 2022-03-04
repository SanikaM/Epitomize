import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header component', () => {
 test('it renders', () => {
   render(<Header />);
   expect(screen.getByText('Epitomize')).toBeInTheDocument();
 });
})