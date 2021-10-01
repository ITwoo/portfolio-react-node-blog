import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import editorconfig from './ckeditorconfig';
import { ADD_POST_REQUEST, UPDATE_POST_REQUEST } from '../actionTypes/post';

import '../css/ckeditor5_custom.css';
import ModalComponent from './modal';


const Ckeditor5_custom = ({ post, id }) => {
  console.log(post)
  const [category, setCategory] = useState('카테고리 없음');
  const [content, setContent] = useState('');
  const [CKBool, setCKBool] = useState(true);
  // const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('render')
    if(post){
      setCategory(post.Category.kinds)
    }
  },[])
  const onWrite = useCallback(() => {
    if (id === undefined) {
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          category: category,
          content: content
        }
      });
    } else {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          id: id,
          category: category,
          content: content
        }
      })
    }
  }, [id, category, content, dispatch])
  // console.log(category)
  return (
    <div className="App">
      <br />
      <ModalComponent setCategory={setCategory} category={category} />
      <br />
      {/* {console.log(post.id)} */}
      {
      CKBool &&
        <CKEditor
        editor={ClassicEditor}
        config={editorconfig}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
          if (post) {
            console.log(post)
            editor.setData(post.content);
          }
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
          console.log(category)
          // setCategory(editor)
          // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          // console.log({ event, editor, data })
        }}
        />
      }
      {/* {console.log('end')} */}
      <Link to="/" >
        <button className="custom btn btn-danger">취소</button>
      </Link>
      <Link to="/" >
        <button className="custom btn btn-success" onClick={onWrite}>완료</button>
      </Link>
    </div>
  );
}

export default Ckeditor5_custom;