import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Basic, InsideRouter, SubPath, DefaultError } from './Admin.stories';

describe('<Admin>', () => {
    beforeEach(() => {
        window.history.replaceState({}, '', '/');
        window.scrollTo = jest.fn();
    });

    it('creates valid links when used without a basename', async () => {
        render(<Basic />);
        await screen.findByText('Post List');
        screen.getAllByText('Comments')[0].click();
        await screen.findByText('Comment List');
    });

    it('works inside a router', async () => {
        render(<InsideRouter />);
        await screen.findByText('Post List');
        screen.getAllByText('Comments')[0].click();
        await screen.findByText('Comment List');
    });

    it('works when mounted in a subPath', async () => {
        render(<SubPath />);
        screen.getByText('Go to admin').click();
        await screen.findByText('Post List');
        screen.getAllByText('Comments')[0].click();
        await screen.findByText('Comment List');
    });

    describe('error handling', () => {
        it('renders the error component when an error is thrown', async () => {
            jest.spyOn(console, 'error').mockImplementation(() => {});
            render(<DefaultError />);
            await screen.findByText('Something went wrong');
        });
    });
});
