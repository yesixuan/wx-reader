import Taro, { useState } from '@tarojs/taro'
import { View, Input, Textarea, Button } from '@tarojs/components'
import './index.styl'

export default function Index() {
  const [ bookName, setBookName ] = useState('')
  const [ comment, setComment ] = useState({ quote: '', remark: '' })

  const handleBookName = e => {
    setBookName(e.target.value)
  }
  const handleComment = (e, key) => {
    setComment({ ...comment, [key]: e.target.value })
  }
  const handleSubmit = () => {
    Taro.cloud
      .callFunction({
        name: "addBook",
        data: {
          bookName,
          comment
        }
      })
      .then(res => {
        console.log(res)
      })
  }

  return <View className='index'>
    <Input value={bookName} onInput={e => handleBookName(e)} placeholder="书名"/>
    <Textarea value={comment.quote} onInput={e => handleComment(e, 'quote')} placeholder="原文"/>
    <Textarea value={comment.remark} onInput={e => handleComment(e, 'remark')} placeholder="批注"/>
    <Button onClick={handleSubmit}>添加笔记</Button>
  </View>
}
Index.config = {
  navigationBarTitleText: '添加笔记'
}
