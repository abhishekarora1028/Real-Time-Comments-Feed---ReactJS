import React from 'React';
import { render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeleteComments from '../DeleteComments';
import socketIOClient from "socket.io-client";

afterEach(cleanup);

describe('DeleteComments', () => {

    it('Should render the Delete Comments Page', () =>{
        const { asFragment } = render(<DeleteComments/>);
        expect(asFragment(<DeleteComments/>)).toMatchSnapshot();
    });
});