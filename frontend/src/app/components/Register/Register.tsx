import React, { useEffect, useRef, useState } from 'react'
import styles from './Register.module.css'
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch } from '../redux/store';
import { registerProcess } from '../redux/userSlice';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import TriangleLoader from '../common/TriangleLoader/TriangleLoader';

interface IFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string().required('Password is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});

interface inputSuccessState {
  firstName: boolean | null;
  lastName: boolean | null;
  email: boolean | null;
  password: boolean | null;
  passwordConfirm: boolean | null;
}

const Register = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [inputSuccess, setInputSuccess] = useState<inputSuccessState>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    passwordConfirm: null
  })
  const [firstNameHasBlurred, setFirstNameHasBlurred] = useState<boolean | null>(null)
  const [lastNameHasBlurred, setLastNameHasBlurred] = useState<boolean | null>(null)
  const [emailHasBlurred, setEmailHasBlurred] = useState<boolean | null>(null)
  const [passwordHasBlurred, setPasswordHasBlurred] = useState<boolean | null>(null)
  const [passwordConfirmHasBlurred, setPasswordConfirmHasBlurred] = useState<boolean | null>(null)
  const [resError, setResError] = useState<string>('')
  const [existingEmails, setExistingEmails] = useState<string[]>([])
  const [loading, setLoading]= useState<boolean>(false)
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
    if (formIsValid) {
      setLoading(true)
      dispatch(registerProcess(data)).unwrap()
      .then(res => {
        res.success && window.location.assign('/products')
      })
      .catch(err => {
        if (err.message === 'email already exists') {
          const email = data.email
          setError('email', {
            type: 'manual',
            message: 'Email already exists'
          })
          if (!existingEmails.includes(email)) {
            setExistingEmails([...existingEmails, email])
          }
        }
      }).finally(() => setLoading(false))
    } 
  }
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    console.log(inputSuccess)
  }, [inputSuccess])

const checkEmail = (email:string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email)

}

const checkPassword = (password:string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return regex.test(password)
}

const checkName = (name:string) => {
  const regex = /^[A-Za-z]+$/
  return regex.test(name)
}

  const handleInputValidation = (value:string, inputName:string): boolean =>  {
    if (inputName === 'firstName' || inputName === 'lastName') {
      inputName === 'firstName' ? setFirstNameHasBlurred(true) :
      setLastNameHasBlurred(true)
      if (value.length < 2) {
        setError(inputName, {
          type: 'manual',
          message: 'Names must be at least 2 letters'
        });
        return false
      } else if (!checkName(value)) {
        setError(inputName, {
          type: 'manual',
          message: "Names must only contain letters"
        });
        return false
      } else {
        clearErrors(inputName)
        return true
      }
    }
    else if (inputName === 'email') {
      setEmailHasBlurred(true)
      if (!checkEmail(value)) {
        setError(inputName, {
          type: 'manual',
          message: 'Please enter a valid email'
        })
        return false
      }
      else if (existingEmails.length > 0 && existingEmails.includes(value)) {
        setError(inputName, {
          type: 'manual',
          message: 'Email already exists'
        })
      }
      else {
        clearErrors(inputName)
        return true
      }
    }
    else if (inputName === 'password') {
      setPasswordHasBlurred(true)
      if (!checkPassword(value)) {
        setError(inputName, {
          type: 'manual',
          message: 'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a special character and a number'
        })
        return false
      }
      else {
        clearErrors(inputName)
        return true
      }
    }
    else if (inputName === 'passwordConfirm') {
      setPasswordConfirmHasBlurred(true)
      if (allValues.passwordConfirm !== allValues.password) {
        setError(inputName, {
          type: 'manual',
          message: 'Passwords do not match'
        })
        return false
      }
      else if (!checkPassword(value)) {
        setError(inputName, {
          type: 'manual',
          message: 'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a special character and a number'
        })
        return false
      }
      else {
        clearErrors(inputName)
        return true
      }
    }
    return false
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerDiv}>
        <h1 className={styles.header}>Join the Rize</h1>
        <h2 className={styles.subHeader}>Create your account to get started</h2>
        <div className={styles.formDiv}>
          <form id={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.namesContainer}>
              <div className={styles.firstNameContainer}>
                <label className={styles.label}>First Name:</label>
                <input
                  className={`${styles.input} ${!!errors.firstName ? styles.inputError : firstNameHasBlurred !== null && styles.inputSuccess}`}
                  {...register('firstName')}
                  placeholder='Enter your First Name'
                  onBlur={(e) => handleInputValidation(e.target.value, 'firstName')}
                  // onChange={(e) => setFirstName(e.target.value.value)}
                  // style={{borderColor: errors.firstName ? 'var(--color-error)' : 'var(--text-tertiary)' }}
                />
                {errors.firstName && <p className={styles.errorText}>{errors.firstName.message}</p>}
              </div>
              <div className={styles.lastNameContainer}>
                <label className={styles.label}>Last Name:</label>
                <input
                  className={`${styles.input} ${!!errors.lastName ? styles.inputError : lastNameHasBlurred !== null && styles.inputSuccess}`}
                  {...register('lastName')}
                  placeholder='Enter your Last Name'
                  onBlur={(e) => handleInputValidation(e.target.value, 'lastName')}
                  // onChange={(e) => setLastName(e.target.value.value)}
                />
                {errors.lastName && <p className={styles.errorText}>{errors.lastName.message}</p>}
              </div>
            </div>
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
            <div className={styles.passwordContainer}>
              <label className={styles.label}>Confirm Password:</label>
              <div style={{position: 'relative', width: '100%'}}>
                <input 
                  className={`${styles.input} ${!!errors.passwordConfirm ? styles.inputError : passwordConfirmHasBlurred !== null && styles.inputSuccess}`}
                  type={!showPassword ? "password" : "text"}
                  {...register('passwordConfirm')}
                  placeholder='Confirm your Password'
                  onBlur={(e) => handleInputValidation(e.target.value, 'passwordConfirm')}
                  // onChange={(e) => setPasswordConfirm(e.target.value.value)}
                  />
                <div className={styles.endIconContainer} onClick={toggleShowPassword}>
                    {!showPassword ? <FaRegEyeSlash className={styles.endIcon} size={20}/> : <FaRegEye className={styles.endIcon} size={20}/>}
                </div>
                {errors.passwordConfirm && <p className={styles.errorText}>{errors.passwordConfirm.message}</p>}
              </div>
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.btn} type="submit">Create Account</button>
            </div>
              {resError && <p style={{textAlign: 'center'}} className={styles.errorText}>{resError}</p>}
          </form>
        </div>
      </div>
      <div className={styles.bottomTextContainer}>
        <p>Already have an account? <span onClick={() => window.location.assign('/login')}>Login</span></p>
      </div>
        <TriangleLoader 
          open={loading} 
          onClose={() => setLoading(false)}
          loaderColor={'var(--color-copper-rust)'}
          loaderText={'Registering your account...'}
        />
    </div>
  )
}

export default Register