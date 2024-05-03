import React, { useEffect, useRef, useState } from 'react'
import styles from './Login.module.css'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch } from '../redux/store';
import { loginProcess, registerProcess } from '../redux/userSlice';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import TriangleLoader from '../common/TriangleLoader/TriangleLoader';

interface IFormInput {
  email: string;
  password: string;
}

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [emailHasBlurred, setEmailHasBlurred] = useState<boolean | null>(null)
  const [passwordHasBlurred, setPasswordHasBlurred] = useState<boolean | null>(null)
  const [resError, setResError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });
  const allValues = watch();
  const onSubmit: SubmitHandler<IFormInput> = async (data:IFormInput) => {
    let formIsValid = true
    Object.entries(allValues).forEach(([key, value]) => {
      const inputIsValid = handleInputValidation(value, key)
      if (!inputIsValid) formIsValid = false
    })
    if (formIsValid){
      setLoading(true)
      dispatch(loginProcess(data)).unwrap()
      .then(res => {
        res.success && window.location.assign('/products')
      })
      .catch(err => {
        if (err.message === 'invalid email') {
          setError('email', {
            type: 'manual',
            message: 'Email not found'
          })
        } else if (err.message === 'incorrect password') {
          setError('password', {
            type: 'manual',
            message: 'Incorrect password'
          })
        }
      })
      .finally(() => setLoading(false))
    }
  }
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

const checkEmail = (email:string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email)

}

const checkPassword = (password:string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return regex.test(password)
}

  const handleInputValidation = (value:string, inputName:string): boolean =>  {
    if (inputName === 'email') {
      setEmailHasBlurred(true)
      if (!checkEmail(value)) {
        setError(inputName, {
          type: 'manual',
          message: 'Please enter a valid email'
        })
        return false
      }
      else {
        clearErrors(inputName)
        return true
      }
    }
    else if (inputName === 'password') {
      setPasswordHasBlurred(true)
      // if (!checkPassword(value)) {
      //   setError(inputName, {
      //     type: 'manual',
      //     message: 'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a special character and a number'
      //   })
      //   return false
      // }
      // else {
      //   clearErrors(inputName)
      //   return true
      // }
      if (value) return true
      else setError('password', {type: 'manual', message: 'Password is required'})
    }
    return false
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerDiv}>
        <h1 className={styles.header}>Weclome Back</h1>
        <h2 className={styles.subHeader}>Log in to your account</h2>
        <div className={styles.formDiv}>
          <form id={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.emailContainer}>
              <label className={styles.label}>Email:</label>
              <input 
                className={`${styles.input} ${!!errors.email ? styles.inputError : emailHasBlurred !== null && styles.inputSuccess}`}
                type="email" {...register('email')}
                placeholder='Enter your Email'
                onBlur={(e) => handleInputValidation(e.target.value, 'email')}
                // onChange={(e) => setEmail(e.target.value.value)}
              />
              {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
            </div>
            <div className={styles.passwordContainer}>
              <label className={styles.label}>Password:</label>
              <div style={{position: 'relative', width: '100%'}}>
                <input 
                  className={`${styles.input} ${!!errors.password ? styles.inputError : passwordHasBlurred !== null && styles.inputSuccess}`}
                  type={!showPassword ? "password" : "text"}
                  {...register('password')}
                  placeholder='Enter your Password'
                  onBlur={(e) => handleInputValidation(e.target.value, 'password')}
                  // onChange={(e) => setPassword(e.target.value.value)}
                />
                <div className={styles.endIconContainer} onClick={toggleShowPassword}>
                    {!showPassword ? <FaRegEyeSlash className={styles.endIcon} size={20}/> : <FaRegEye className={styles.endIcon} size={20}/>}
                </div>
                {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
              </div>
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.btn} type="submit">Log In</button>
            </div>
              {resError && <p style={{textAlign: 'center'}} className={styles.errorText}>{resError}</p>}
          </form>
        </div>
      </div>
      <div className={styles.bottomTextContainer}>
        <p>Not yet apart of the Rize? <span onClick={() => window.location.assign('/register')}>Register</span></p>
      </div>
      <TriangleLoader 
          open={loading} 
          onClose={() => setLoading(false)}
          loaderColor={'var(--color-copper-rust)'}
          loaderText={'Logging you in...'}
        />
    </div>
  )
}

export default Login