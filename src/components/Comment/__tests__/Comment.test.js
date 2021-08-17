import React from 'React';
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Comment from '../Comment';

afterEach(cleanup);

describe('Comment', () => {
    const defaultProps = {
        comment: {"name":"abhishek", "message":"this is test message", "created":"2021-08-16 08:41:39"}
    };

    it('Should render the comment box successfully', () =>{
        const { asFragment } = render(<Comment {...defaultProps} />);
        expect(asFragment(<Comment {...defaultProps}/>)).toMatchSnapshot();
    });

    it('Should have the comment message', () =>{
        const { getByTestId } = render(<Comment {...defaultProps} />);
        expect(getByTestId('commentmessage')).toHaveTextContent('this is test message');
    });
});