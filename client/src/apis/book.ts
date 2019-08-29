import Taro from '@tarojs/taro'

export const callCloud = (name, data?:object) => {
  return Taro.cloud.callFunction({
    name: name,
    data
  }).then(res => {
    // Taro.atMessage({
    //   'message': res.result.errMsg,
    //   'type': 'success',
    // })
    return res.result.data
  }).catch(e => {
    Taro.atMessage({
      'message': e.errMsg,
      'type': 'error',
    })
  })
}
