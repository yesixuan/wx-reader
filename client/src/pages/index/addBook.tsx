import Taro, {useEffect} from '@tarojs/taro'
import { Button } from '@tarojs/components'
import {
  AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput
} from "taro-ui"
import { useForm } from '../../hooks'
import './index.styl'

export default function AddBook({ isOpened, handleClose, handleAdd }) {
  const [field, formData, resetForm] = useForm({ bookName: '', author: '' })
  useEffect(() => resetForm(), [isOpened])

  const handleSubmit = async () => {
    if (!formData['bookName']) {
      Taro.atMessage({
        'message': '书名必填',
        'type': 'warning',
      })
      return
    }
    await handleAdd(formData)
    handleClose()
  }

  return <AtModal isOpened={isOpened}>
    <AtModalHeader>添加书籍</AtModalHeader>
    <AtModalContent>
      <AtInput
        error
        name='bookName'
        type='text'
        placeholder='书名'
        {...field('bookName')}
      />
      <AtInput
        name='author'
        type='text'
        placeholder='作者'
        {...field('author')}
      />
    </AtModalContent>
    <AtModalAction>
      <Button onClick={handleClose}>取消</Button>
      <Button onClick={handleSubmit}>确定</Button>
    </AtModalAction>
  </AtModal>
}
