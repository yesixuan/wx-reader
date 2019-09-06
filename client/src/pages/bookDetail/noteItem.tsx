import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { useDynamicClass } from '../../hooks'
import './noteItem.styl'

export default ({ item, item: { _id, note, comment }, activeItem, setActiveItem, setShowActionSheet }) => {
  const [open, setOpen] = useState(false)
  const itemClass = useDynamicClass({
    'note-item--active': _id === activeItem._id
  }, 'note-item')
  const handlePress = () => {
    setActiveItem(item)
    setShowActionSheet(true)
  }
  return <View className={itemClass} onLongPress={handlePress} >
    <View className='note'>{note}</View>
    {
      open && <View className='comment'>批注： <View>{comment}</View></View>
    }
    {
      comment && <View className='arrow' onClick={() => { setOpen(val => !val) }} >
        <AtIcon value={ open ? 'chevron-up' : 'chevron-down' } size='18' color='#6190e8' />
      </View>
    }
  </View>
}
