import { useState  , useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AppContext } from "../lib/contextLib";

const Login = (props) => {

  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({ error: false, message: "" });
  const history = useHistory();

  const {isAuthenticated , setIsAuthenticated} = useContext(AppContext);
  console.log(isAuthenticated);



  const UsernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(Username, password);
      console.log(user);
      setIsAuthenticated(true) ; 
      history.push("/");
    } catch (error) {
      console.log(error.message);
      setErr({ error: true, message: error.message });
    }
  };

  return (
    <div className="auth-wrapper mt-4">
      <div className="auth-inner">
        <p className="text-center">
          <Link className="logo" to="/">
            PICTURE PERFECT
          </Link>
        </p>
        <h3>Log in</h3>
        <h6 className="text-center">
          Enter your credentials <hr style={{ color: "red" }}></hr>
        </h6>

        { err.error && <div style = {{color : "darkred" , marginBottom: "10px" , fontSize: "14px" , fontWeight: "bold"}}> * {err.message} </div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={UsernameChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={passwordChangeHandler}
            />
          </div>

          <div className="form-group mt-2">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <p className="forgot-password">
            <a href="#">Forgot password?</a>
          </p>

          <button type="submit" className="btn btn-primary btn-block" style = {{marginBottom : "12px"}}>
            Sign in
          </button>
          <p className="text-left">
            Don't have an account ?
            <Link className="link" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
