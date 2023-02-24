/* eslint-disable global-require */
import { render, screen } from '@testing-library/react';
import Error from '@app/pages/error';

// mocking next js router on dev environment
jest.mock('next/router', () => require('next-router-mock'));

describe('404', () => {
    it('renders the error page', () => {
        render(<Error />);
        const heading = screen.getByText(/GO BACK HOME/);
        expect(heading).toBeInTheDocument();
    });
});
