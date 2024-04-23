import axios from "axios";
import { URLs } from "./url";

export const register = async (data:Record<string, any>) => {
  try {
    const res = await axios.post(
      URLs.user.register,
      data,
      {headers: {"Content-Type": "multipart/form-data"}},
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