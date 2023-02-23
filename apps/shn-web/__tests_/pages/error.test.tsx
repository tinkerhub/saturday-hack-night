import { render, screen } from '@testing-library/react';
import Error from '../../pages/error';

describe('404', () => {
    it('renders a heading', () => {
        render(<Error />);
        const heading = screen.getByText(/go back home/);
        expect(heading).toBeInTheDocument();
    });
});
