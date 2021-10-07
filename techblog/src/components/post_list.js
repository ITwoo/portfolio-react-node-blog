import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LOAD_POSTS_REQUEST } from '../actionTypes/post';
import '../css/postList.css'

const Post_list = () => {
  const [pageBool, setPageBool] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  const param = useParams();
  console.log(param)
  const SearchRef = useRef();
  const [paginationParam, setPagenationParam] = useState('/list');
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const offset = post.posts[(post.posts.length - 1)]?.id || 0;
  // console.log(offset)
  const [search, setSearch] = useState('');
  useEffect(() => {
    console.log('dis')
    if (parseInt(currentPage) === 1) {
      dispatch({
        type: LOAD_POSTS_REQUEST,
        data: { id: 0 }
      })
    }
  }, []);
  
  useEffect(() => {
    console.log('a')
    console.log(currentPage)
    if (pageBool && currentPage !== 1) {
      setCurrentPage(1)
    }
    if (param.category !== undefined) {
      setPagenationParam("/list/" + param.category);
    } else {
      setPagenationParam("/list");
    }
    setPageBool(true);
  }, [param]);

  const onClickPagination = useCallback((e) => {
    setCurrentPage(e.target.id);
    setPageBool(false);
  }, [])

  const rg = useCallback((s) => {
    let text = s.replace(/<(\/)?([a-zA-Z1-3]*)(\s[a-zA-Z1-3]*=[^>]*)?(\s)*(\/)?>/ig, " ")
    text = text.replace(/&nbsp;/gi, " ");
    text = text.replaceAll('&lt;', '<');
    text = text.replaceAll('&gt;', '>');
    return text;
  })
  const list = useCallback(() => {
    let text = {
      posts: []
    }
    console.log(param, search)
    if (param.category !== undefined && search !== '') {
      text.posts = post.posts.filter((item) => {
        // console.log(item.Category.kinds)
        // console.log(item.Category.kinds.includes(param.category))
        if (item.Category && item.Category.kinds === param.category && rg(item.content).includes(search)) {
          return true;
        } else {
          return false
        }
      })
    } else if (param.category !== undefined && search === '') {
      text.posts = post.posts.filter((item) => {
        // console.log(item.Category.kinds)
        // console.log(item.Category.kinds.includes(param.category))
        // console.log(item)
        if (item.Category && item.Category.kinds === param.category) {
          console.log(item.Category.kinds === param.category)
          return true;
        } else {
          return false
        }
      })
    } else if (param.category === undefined && search !== '') {
      // let temp = {
      //   posts : []
      // }
      // text.posts = temp.post;
      // console.log('a')
      text.posts = post.posts.filter((item) => {
        // console.log(rg(item.content).includes(search))
        return rg(item.content).includes(search);
      })
    } else {
      text = post
      console.log('why')
    }
    const currentPost = text.posts.slice(0 + 5 * (currentPage - 1), 5 + 5 * (currentPage - 1));

    console.log(currentPage)
    console.log(currentPost)
    return currentPost.map((p,i) => {
      const category = p.Category && p.Category !== undefined ? p.Category.kinds : ''
      const id = "/post/" + p.id;
      // console.log(p.Images);
      const src = p.Images !== undefined ? p.Images[0] && p.Images[0].src : 'https://via.placeholder.com/250x150/00CED1/000000';
      let content = '';
      let title = '';
      const index = p.content.indexOf("<h1");
      const middle = p.content.indexOf(">");
      const end = p.content.indexOf('</h1>', middle + 1);
      // console.log(index)
      if (index !== -1) {
        title = rg(p.content.substring(middle + 1, end)).substring(0, 50);
        content = rg(p.content.substring(end + 5)).substring(0, 100);
        // console.log(title.length)
        if (title.length >= 50) {
          title = title + "...";
        }
        if (content.length >= 100) {
          content = content + "...";
        }
      }
      // console.log(title)
      // console.log(content);
      else {
        content = p.content.replace(/<(\/)?([a-zA-Z1-3]*)(\s[a-zA-Z1-3]*=[^>]*)?(\s)*(\/)?>/ig, "")
        content = content.replace(/&nbsp;/gi, " ");//공백제거
        content = content.replaceAll('&lt;', '<');
        content = content.replaceAll('&gt;', '>');
      }
      return (
        <article key={i}>
          <div className="line-item hf-item-odd clearfix">
            <div className="content-image">
              <Link className="image-link article-link" to={id}>
                <img className="img-thumbnail list_img" src={src} alt=""/>
                <span className="overlay article-overlay"></span>
              </Link>
            </div>
            <div className="hf-info">
              <div className="hf-category">
                <Link to={"/list/" + category} className="text-danger text-decoration text-category">
                  {category}
                </Link>
              </div>
              <h1 className="post-title">
                <Link className="article-link text-dark text-decoration" to={id}>
                  {title === ' ' ? '제목 없음' : title}
                  <span className="overlay article-overlay"></span>
                </Link>
              </h1>
              <div className="summary">
                <div className="content">
                  <Link className="article-link text-dark text-decoration" to={id}>
                    {content}
                  </Link>
                </div>
              </div>
              <div className="right" style={{ display: "block" }}>
                {p.createdAt ? p.createdAt.substring(0, 10) : 'NOT FOUND'}
              </div>
            </div>

          </div>
        </article>
      )
    })
  }, [post, search, param, currentPage]);

  const onSearch = useCallback(() => {
    setSearch(SearchRef.current.value);
  }, [search]);
  return (
    <div className="container bootstrap snippets bootdey">
      <div className="col-md-4 right_posts">
        <div className="search" >
          <input className="width70 form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={SearchRef} />
          <button className="width30 btn btn-outline-success font_size" onClick={onSearch}>Search</button>
        </div>
        <div>
          {list()}
        </div>
        <div className="pagination">
          <Link to="">&laquo;</Link>
          {
            pages.map((p, i) =>
              <Link to={paginationParam} className={parseInt(currentPage) === p ? "active" : ''} onClick={onClickPagination} id={p} key={i}>{p}</Link>
            )
          }
          <Link to="">&raquo;</Link>
        </div>
      </div>
    </div>
  )
}

export default Post_list;