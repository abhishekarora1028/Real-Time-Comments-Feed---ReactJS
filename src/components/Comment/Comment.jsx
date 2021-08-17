import React from 'react';
import * as PropTypes from 'prop-types';
import { Media} from 'react-bootstrap';
import './Comment.scss';

const Comment = (props) => {
	const { comment } = props;
	return (
		<Media data-id={comment.id} className="commentbox mb-2">
              <div className="author-image">{comment.name.substring(0,1)}</div>
              <Media.Body>
                <p className="comment" data-testid="commentmessage">
                  {comment.message}
                </p>
                <p className="author">By {comment.name} at {comment.created}</p>
              </Media.Body>
    </Media>
	);
};

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
}


export default Comment;