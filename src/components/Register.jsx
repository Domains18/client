import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    // if button was enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    console.log(user, pwd);
    setSuccess(true);
  }

  return (
    <section>
      <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Register</h1>
      <form onSubmit={handlesubmit}>
        <label htmlFor="username">
          username:
          <span className={validName ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="on"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby="uuidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uuidnote"
          className={userFocus && user && !validName ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must begin with a letter between 4-24 characters <br />
          Letters, numbers, hyphens allowed
        </p>
        {/* password */}
        <label htmlFor="password">
          password:
          <span className={validPwd ? "valid" : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          autoComplete="on"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? 'false' : 'true'}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id='pwdnote' className={pwdFocus && pwd && !validPwd ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must be 8-24 characters <br />
          At least one uppercase, lowercase, number, and symbol <br />
          Allowed special characters: <span aria-label='exclamation mark'>!</span>
          <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
          <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
        </p>
        {/* confirm password */}
        <label htmlFor="confirm_password">
          confirm password:
          <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_password"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? 'false' : 'true'}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id='confirmnote' className={matchFocus && matchPwd && !validMatch ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match password
        </p>
        <button disabled={!validName || !validPwd || !validMatch ? true : false}>
          Submit
        </button>
      </form>
      <p>
        Already Registered? <br />
        <span className="line">
          {/* Router link */}
          <a href="#">Login</a>
        </span>
      </p>
    </section>
  );
};

export default Register;
