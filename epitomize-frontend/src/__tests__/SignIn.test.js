import { render, screen } from '@testing-library/react';
import SignIn from '../Components/Signin';

describe('Signin component', () => {
 test('it renders', () => {
   render(<SignIn />);
   expect(screen.getByTestId('email')).toBeInTheDocument();
   expect(screen.getByTestId('password') ).toBeInTheDocument();

 });
})