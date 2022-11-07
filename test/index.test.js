import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
    fetchMock.mockResponse(() => Promise.resolve('Success'))
});

test('renders the home page', () => {
    render(<Home/>);
    expect(screen.getByRole('img')).toBeInTheDocument()
});