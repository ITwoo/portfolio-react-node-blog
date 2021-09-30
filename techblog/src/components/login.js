import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST } from '../actionTypes/user';

const Login = () => {
  const { credential, loginLoading } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginBool, setLoginBool] = useState(false);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
      dispatch({
        type: LOGIN_REQUEST,
        data: {
          email: email,
          password: password
        }
      });
      setLoginBool(true);
  }, [email, password]);

  useEffect(() => {
    console.log(loginBool)
    if (loginBool) {
      console.log(loginLoading)
      if (loginLoading === false) {
        console.log(credential)
        if (credential === true) {
          history.push('/');
          alert('로그인 완료');
          setLoginBool(false)
        } else {
          alert('로그인 실패');
          setLoginBool(false)
        }
      }
    }
  }, [credential, loginLoading, loginBool])
  return (
    <>
      {console.log(email, password)}
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      <div class="container">
        <div class="row">
          <div class="col-md-6 c_login">
            <div class="panel panel-login">
              <div class="panel-heading">
                <div class="row">
                  <div class="col-xs-6">
                    <Link to="/login" class="active" id="login-form-link">Login</Link>
                  </div>
                  <div class="col-xs-6">
                    <Link to="/register" id="register-form-link">Register</Link>
                  </div>
                </div>
                <hr />
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-lg-12">
                    {/* <form id="login-form" action="https://phpoll.com/login/process" method="post" role="form" style={{display: 'block'}}> */}
                    <div class="form-group">
                      <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value={email} onChange={onChangeEmail} />
                    </div>
                    <div class="form-group">
                      <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" value={password} onChange={onChangePassword} />
                    </div>
                    <div class="form-group text-center">
                      <input type="checkbox" tabindex="3" class="" name="remember" id="remember" />
                      <label for="remember"> Remember Me</label>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                          <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In" onClick={onSubmit} />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="text-center">
                            <a href="https://phpoll.com/recover" tabindex="5" class="forgot-password">Forgot Password?</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login;