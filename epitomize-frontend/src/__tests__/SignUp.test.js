import { render, screen } from '@testing-library/react';
import SignUp from '../Components/Signup';

describe('Signup component', () => {
 test('it renders', () => {
   render(<SignUp />);
   expect(screen.getByTestId('Username')).toBeInTheDocument();
   expect(screen.getByTestId('Emailid')).toBeInTheDocument();
   expect(screen.getByTestId('About')).toBeInTheDocument();
   expect(screen.getByTestId('Password') ).toBeInTheDocument();

 });
})