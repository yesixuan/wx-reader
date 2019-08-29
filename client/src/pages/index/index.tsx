import Taro, { useState, useCallback, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {
  AtSearchBar, AtList, AtListItem, AtFab, AtMessage, AtSwipeAction
} from "taro-ui"
import AddBook from './addBook'
import { callCloud } from '../../apis/book'
import './index.styl'

export default function Index() {
  const [search, setSearch] = useState('')
  const [ showModal, setShowModal ] = useState(false)
  const [ books, setBooks ] = useState([])
  const handleShowModal = () => {
    setShowModal(val => !val)
  }

  const fetchData = async (search) => {
    const books = await callCloud('fetchBooks', {search})
    setBooks(books)
  }
  useEffect(() => {
    fetchData(search)
  }, [search])

  const handleClose = useCallback(() => {
    setShowModal(false)
  }, [])
  const handleAdd = useCallback(async data => {
    await callCloud('addBook', data)
    fetchData(search)
  }, [])
  const handleSwipe = async ({ text }, id) => {
    if (text === '删除') {
      await callCloud('deleteBook', { id })
      fetchData(search)
    }
  }

  return <View className='book-list'>
    <AtSearchBar value={search} onChange={val => setSearch(val)} />
    <AtList>
      {
        books.map(book => (
          <AtSwipeAction
            autoClose
            key={book._id}
            onClick={e => handleSwipe(e, book._id)}
            options={[
            {
              text: '取消',
              style: {
                backgroundColor: '#6190E8'
              }
            },
            {
              text: '删除',
              style: {
                backgroundColor: '#FF4949'
              }
            }
          ]}>
            <AtListItem title={book.bookName} note={book.author} />
          </AtSwipeAction>
        ))
      }
    </AtList>
    <View className='float-button'>
      <AtFab onClick={handleShowModal}>
        <Text className='at-fab__icon at-icon at-icon-add' />
      </AtFab>
    </View>
    <AddBook isOpened={showModal} handleClose={handleClose} handleAdd={handleAdd} />
    <AtMessage />
  </View>
}
Index.config = {
  navigationBarTitleText: '我的阅读'
}
