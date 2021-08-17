import React from 'React';
import { render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CommentsForm from '../CommentsForm';

afterEach(cleanup);

describe('CommentForm', () => {

    it('Should render the comment form successfully', () =>{
        const { asFragment } = render(<CommentsForm/>);
        expect(asFragment(<CommentsForm/>)).toMatchSnapshot();
    });
});