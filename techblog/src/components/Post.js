import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';

import { LOAD_POST_REQUEST, REMOVE_POST_REQUEST } from '../actionTypes/post';
import { Link, useParams } from 'react-router-dom';
import '../css/post.css'

const Post = () => {
  // const posts = useSelector((state) => state.post?.posts)
  const [passport, setPassport] = useState(false);
  const p = useParams();
  const post = useSelector((state) => state.post.post)
  const info = useSelector((state) => state.user.info)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: { id: p.id }
    })
    // console.log(p.id)
  }, [p.id])

  useEffect(() => {
    if (info !== null) {
      info.Posts.map((v) => {
        if (v.id === parseInt(p.id)) {
          setPassport(true)
        }
        return 0;
      })
    }
  }, [p.id, info])
  // console.log(posts[0].content);

  const onClickDelete = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { id: p.id }
    })
  }, [p.id]);

  return (
    <div className="rimg">
      <div className="postButton">
        {passport && <> <Link to={"/revise/" + p.id} className="postCustom">
          <button className="custom btn btn-success">수정</button>
        </Link>
          <Link to="/" className="postCustom">
            <button className="custom btn btn-danger" onClick={onClickDelete}>삭제</button>
          </Link>
        </>
        }
      </div>
      <div style={{ display: "block" }}>
        {post.content !== undefined ? parse(post.content) : <div> NOT FOUND</div>}
      </div>
    </div>
  );
}

export default Post;