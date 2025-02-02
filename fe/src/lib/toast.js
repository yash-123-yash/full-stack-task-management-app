import { toast } from "react-toastify"

export const succesNotify = (msg) => toast.success(msg)
export const errorNotify = (msg) => toast.error(msg)