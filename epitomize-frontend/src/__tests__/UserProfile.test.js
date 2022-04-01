import { render, screen } from '@testing-library/react';
import SignUp from '../Components/UserProfile';

describe('User profile component', () => {
 test('it renders', () => {
   render(<SignUp />);
   expect(screen.getByText('Username')).toBeInTheDocument();
   expect(screen.getByText('Email Address')).toBeInTheDocument();
   expect(screen.getByText('About') ).toBeInTheDocument();
   expect(screen.getByText('Password') ).toBeInTheDocument();

 });
})