import { Link } from "react-router-dom";
import {useState} from "react" ; 
import {Auth } from "aws-amplify" ;


const Confirmation = (props) => {


  return (
    <div>
      <p>New Account has been created. Verification mail has been sent to your mail id. Click on the confirmation link to verify your account. Sign in after that. </p>
      <Link to = "/login" className = "btn btn-primary remove-blue">Log in</Link>

    </div>

  )
}


const Signup = (props) => {

  const[fields , setFields] = useState({
    username : "",
    email : ""  , 
    password : "" , 
    confirmPassword : ""
  })
  const [newUser , setNewUser] = useState(null) ; 

  const[err , setErr] = useState({ error : false , message : ""}) ; 

  const emailFieldChangeHandler = (e) => {
    setFields({...fields , email : e.target.value})
    // console.log(fields) ;
  }
  const usernameFieldChangeHandler = (e) => {
    setFields({...fields , username : e.target.value})
    // console.log(fields) ;

  }
  const passwordFieldChangHandler = (e) => {
    setFields({...fields , password : e.target.value}) 
    // console.log(fields) ;

  }
  const confirmPasswordFieldChangeHandler = (e) => {
    setFields({...fields, confirmPassword : e.target.value})
    // console.log(fields) ;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault() ;

    try {
      if (fields.password !== fields.confirmPassword){
        throw new Error("Passwords do not match ");
      }
      const newUser = await Auth.signUp({
        username:fields.username , 
        password: fields.password, 
        attributes: {
          email: fields.email
        }
      })
      setNewUser(newUser)
      console.log(newUser) ; 
    }
    catch (error){
      setErr({error : true , message : error.message })
      setTimeout( ()=> {setErr({error : false , message : "" } )} , 4000) ;
    }

  }











  return (
    <div className="auth-wrapper mt-4">
      <div className="auth-inner">
          <p className="text-center">
            <Link className="logo" to = "/">PICTURE PERFECT</Link>
          </p>

          <h3>
            Sign Up
            <hr style={{ color: "red" }}></hr>
          </h3>

          
          { err.error  && <div style = {{color : "darkred" , marginBottom: "10px" , fontSize: "14px" , fontWeight: "bold"}}> * {err.message} </div> } 
        
        { !newUser ? (
        <form onSubmit = {handleSubmit}>

          <div className="form-group">
            <label>Username*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange = {usernameFieldChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Email address*</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange = {emailFieldChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange = {passwordFieldChangHandler}
            />
          </div>

          <div className="form-group">
            <label>Password Confirmation*</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password again"
              onChange = {confirmPasswordFieldChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block my-2">
            Sign Up
          </button>

          <div></div>
          <p className="text-left">
            Already have an account ?
            <Link className="link" to="/login">
              Log in
            </Link>
          </p>
        </form>
        ) : <Confirmation/>

        }
        
      </div>
    </div>
  );
};

export default Signup;
