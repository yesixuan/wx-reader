import { useState, useEffect } from '@tarojs/taro'

export const useForm = (initData) => {
  const [formData, setFormData] = useState(initData)

  const get = key => formData[key]
  const set = key => val => {
    val.target && (val = val.target.value)
    setFormData(data => ({ ...data, [key]: val }))
  }
  const field = key => ({
    value: get(key),
    onChange: set(key)
  })
  const resetForm = () => setFormData(initData)
  return [field, formData, setFormData, resetForm]
}

export const useField = (initValue = '') => {
  const [val, setVal] = useState(initValue)
  return [
    {
      checked: val,
      onChange(value) {
        setVal(value)
      }
    },
    val,
    setVal
  ]
}

/**
 * 动态设置样式
 * @param {string} constantClass 固定样式
 * @param dependencies 对象形式的动态样式
 * @returns {string}
 */
export const useDynamicClass = (dependencies, constantClass = '') => {
  const [classStr, setClassStr] = useState(constantClass)
  useEffect(() => {
    const str = Object.entries(dependencies).reduce((prev, [ key, value ]) => {
      if (value) prev += ' ' + key
      return prev
    }, constantClass)
    setClassStr(str)
  }, Object.values(dependencies))
  return classStr
}
