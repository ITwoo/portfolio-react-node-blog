import Layout from '../components/Layout';
import Ckeditor from '../components/ckeditor5_custom';

import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LOAD_POST_REQUEST } from '../actionTypes/post';

const Revise = () => { // 글 수정 2021 09 22 by ITWoo
  const p = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: {id: p.id }
    })
  },[p.id])
  const post = useSelector((state) => state.post.post);
  return (
    <>
      <Layout>
        <Ckeditor post={post} id={p.id}/>
      </Layout>
    </>
  );
}

export default Revise;
