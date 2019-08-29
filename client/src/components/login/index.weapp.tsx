import Taro, { useState } from "@tarojs/taro"
import { View, Text, Button, Input, Textarea } from "@tarojs/components"

export default function Login() {
  const [ info, setInfo ] = useState(null)
  const getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        setInfo(res.result)
      })
    }
  const handleJump = path => wx.navigateTo({
    url: `/pages/${path}`
  })

  return (
    <View className='index'>
      <Button onClick={getLogin}>获取登录云函数</Button>
      <Text>context：{JSON.stringify(info)}</Text>
      <Button onClick={handleJump.bind(this, 'add/index')}>添加书名</Button>
    </View>
  )
}
