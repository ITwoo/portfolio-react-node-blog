import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { JOIN_REQUEST } from "../actionTypes/user";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordBool, setPasswordBool] = useState(false);
  const dispatch = useDispatch();

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value)
  },[])

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[])

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  },[])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
  },[])

  const onClickRegister = useCallback(() => {
    if(password === passwordCheck){
      setPasswordBool(true);
    }
    
    if(passwordCheck){
      dispatch({
        type: JOIN_REQUEST,
        data: {
          username:username,
          email:email,
          password:password,
        }
      })
      history.push('/');
    }
  },[username, email, password, passwordCheck]);
  return (
    <>
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
                    <Link to="/login"  id="login-form-link">Login</Link>
                  </div>
                  <div class="col-xs-6">
                    <Link to="/register" class="active" id="register-form-link">Register</Link>
                  </div>
                </div>
                <hr />
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-lg-12">
                    {/* <form id="register-form" action="https://phpoll.com/register/process" method="post" role="form" style={{display: 'block'}}> */}
                      <div class="form-group">
                        <input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value={username} onChange={onChangeUsername} />
                      </div>
                      <div class="form-group">
                        <input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address"  value={email} onChange={onChangeEmail}/>
                      </div>
                      <div class="form-group">
                        <input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" value={password} onChange={onChangePassword}/>
                      </div>
                      <div class="form-group">
                        <input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password" value={passwordCheck} onChange={onChangePasswordCheck}/>
                      </div>
                      <div class="form-group">
                        <div class="row">
                          <div class="col-sm-6 col-sm-offset-3">
                            <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now" onClick={onClickRegister}/>
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