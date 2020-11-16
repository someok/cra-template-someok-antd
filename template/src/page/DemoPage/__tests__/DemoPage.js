import React from 'react';
import {render, screen} from '@testing-library/react';
import DemoPage from '../index';

test('renders demo page', () => {
    render(<DemoPage />);
    const textElement = screen.getByText(/demo page/i);
    expect(textElement).toBeInTheDocument();
});
