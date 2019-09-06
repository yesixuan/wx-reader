import Taro, {useEffect} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
  AtFloatLayout, AtSwitch, AtTextarea, AtButton
} from "taro-ui"
import { useForm, useField } from '../../hooks'
import './addNote.styl'

export default ({ isOpened, handleAdd, handleEdit, setShowAddNote, isEdit, activeItem }) => {
  const [field, formData, setFormData, resetForm] = useForm({ note: '', comment: '' })
  const [comment, showComment, setComment] = useField(false)
  useEffect(() => resetForm(), [isOpened])
  useEffect(() => {
    if (isEdit) {
      const { _id, ...rest } = activeItem
      console.log('rest', rest)
      setFormData(rest)
      if (activeItem.comment) {
        setComment(true)
      }
    }
  }, [isEdit, activeItem])

  const handleSubmit = async () => {
    if (!formData['note']) {
      Taro.atMessage({
        'message': '原文必填',
        'type': 'warning',
      })
      return
    }
    if (isEdit) {
      await handleEdit(formData)
    } else {
      await handleAdd(formData)
    }
    setShowAddNote(false)
  }

  return <AtFloatLayout isOpened={isOpened} title='添加笔记' onClose={() => setShowAddNote(false)}>
    {/*<AtForm>*/}
      <AtSwitch title='添加批注' { ...comment } border={false} />
      <View className='space' />
      <AtTextarea
        className='foot-space'
        maxLength={200}
        placeholder='原文'
        { ...field('note') }
      />
      <View className='space' />
      {
        showComment && <AtTextarea
          className='foot-space'
          { ...field('comment') }
          maxLength={200}
          placeholder='批注'
        />
      }
      <View className='space' />
      <AtButton type='primary' onClick={handleSubmit}>添加笔记</AtButton>
    {/*</AtForm>*/}
  </AtFloatLayout>
}
