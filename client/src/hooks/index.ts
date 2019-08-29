import { useState } from '@tarojs/taro'

export const useForm = (initData) => {
  const [formData, setFormData] = useState(initData)


  const get = key => formData[key]
  const set = key => val => {
    setFormData(data => ({ ...data, [key]: val }))
  }
  const field = key => ({
    value: get(key),
    onChange: set(key)
  })
  const resetForm = () => setFormData(initData)
  return [field, formData, resetForm]
}
