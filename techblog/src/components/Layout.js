import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_REQUEST, LOGOUT_REQUEST } from '../actionTypes/user';


const Layout = ({ children }) => {
  const history = useHistory();
  
  const dispatch = useDispatch();
  const info = useSelector((state) => state.user.info)
  const toggleRef = useRef();

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST
    })
  },[])

  const onChangeToggle = useCallback((event) => {
    event.preventDefault();
    if (toggleRef.current) {
      toggleRef.current.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', toggleRef.current.classList.contains('sb-sidenav-toggled'));
    }
  }, []);

  const buttonRef = useRef();
  const navSupportRef = useRef();

  const onClickLogOut = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST
    })

    history.push('/')
  },[])

  const onNavButtonClick = useCallback((event) => {
    event.preventDefault();
    if (buttonRef.current) {
      buttonRef.current.classList.toggle('collapsed');
      if (buttonRef.current.classList.contains('collapsed') && buttonRef.current.getAttribute('aria-expanded') === 'true') {
        buttonRef.current.setAttribute('aria-expanded', 'false');
        if (navSupportRef.current.classList.contains('show')) {
          navSupportRef.current.classList.remove('show');
        }
      } else {
        buttonRef.current.setAttribute('aria-expanded', 'true');
        if (!navSupportRef.current.classList.contains('show')) {
          navSupportRef.current.classList.add('show');
        }
      }
    }
  }, []);

  const dropDownRef = useRef();
  const dropDownMenuRef = useRef();
  const onDropDownChange = useCallback((event) => {
    event.preventDefault();
    if (dropDownRef.current) {
      dropDownRef.current.classList.toggle('show');
      if (dropDownRef.current.getAttribute('aria-expaneded') === 'true' && dropDownRef.current.classList.contains('show')) {
        dropDownRef.current.setAttribute('aria-expanded', 'false');
      } else {
        dropDownRef.current.setAttribute('aria-expanded', 'true');
      }
    }
    if (dropDownMenuRef.current) {
      dropDownMenuRef.current.classList.toggle('show');
    }
  }, []);

  return (
    <div id="toggle" ref={toggleRef} >
      <div className="d-flex" id="wrapper">
        <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom bg-light"><Link style={{color:"black", textDecoration:"none"}} to="/">TECH BLOG</Link></div>
          <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list">전 체</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list/React">React</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list/Node">Node</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list/JavaScript">JavaScript</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Events</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="#!">Profile</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/test">Test</Link>
          </div>
        </div>
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
              <button className="btn btn-primary" id="sidebarToggle" onClick={onChangeToggle}>Menu</button>
              <button className="navbar-toggler" onClick={onNavButtonClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" ref={buttonRef}><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navSupportRef}>
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                  <li className="nav-item active"><Link className="nav-link" to="#!">Home</Link></li>
                  {
                    info === null ? <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    : <li className="nav-item"><Link className="nav-link" to="/" onClick={onClickLogOut}>Logout</Link></li>

                  }
                  <li className="nav-item">
                    <Link className="nav-link" to="/">목록</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ref={dropDownRef} onClick={onDropDownChange}>글 관리</Link>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" ref={dropDownMenuRef}>
                      <Link className="dropdown-item" to="/revise">글 수정</Link>
                      <Link className="dropdown-item" to="/write">글 쓰기</Link>
                      <Link className="dropdown-item" to="/delete">글 삭제</Link>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#!">Something else here</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;