import axios from "axios";
import { URLs } from "./url";

export const register = async (data:Record<string, any>) => {
  try {
    const res = await axios.post(
      URLs.user.register,
      data,
      {
        headers: {"Content-Type": "multipart/form-data"},
        withCredentials: true
      }
    )
    if (res.data.error) {
      throw new Error(res.data.error)
    }
    return res.data
  }
  catch (e:any) {
    console.error(e)
    throw new Error(e.message as string)
  }
}

export const login = async (data:Record<string, any>) => {
  try {
    const res = await axios.post(
      URLs.user.login,
      data,
      {
        headers: {"Content-Type": "multipart/form-data"},
        withCredentials: true
      }
    )
    if (res.data.error) {
      throw new Error(res.data.error)
    }
    return res.data
  }
  catch (e:any) {
    console.error(e)
    throw new Error(e.message as string)
  }
}

export const logout = async () => {
  try {
    const res = await axios.get(
      URLs.user.logout,
      {withCredentials: true}
    )
    if (res.data.error) {
      throw new Error(res.data.error)
    }
    return res.data
  }
  catch (e:any) {
    console.error(e)
    throw new Error(e.message as string)
  }
}

export const getInitialUserInfo = async () => {
  try {
    const res = await axios.get(
      URLs.user.getInitialInfo,
      {
        withCredentials: true,
        headers: {'Content-type': 'application/json'},
      }
    )
    if (res.data.error) {
      throw new Error(res.data.error)
    }
    return res.data
  }
  catch (e:any) {
    console.error(e)
    throw new Error(e.message as string)
  }
}