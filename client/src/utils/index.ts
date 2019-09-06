import Taro from '@tarojs/taro'

export const go = (url: string, params?: object) => {
  let queryString = ''
  if (params) {
    queryString = Object.keys(params).reduce((prev, curr, index) => `${prev}${index === 0 || '&'}${curr}=${params[curr]}`, '?')
  }
  Taro.navigateTo({
    url: '/pages/' + url + queryString
  })
}

export const changeTitle = (title: string) => {
  Taro.setNavigationBarTitle({
    title
  })
}

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

