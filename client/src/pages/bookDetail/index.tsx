import Taro, { useState, useCallback, useEffect, useRouter } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtFab, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import AddNote from './addNote'
import NoteItem from './noteItem'
import {changeTitle, callCloud} from '../../utils'
import './index.styl'
import {useDynamicClass} from "../../hooks"

export default function Index() {
  const { params: { bookName, true_id } } = useRouter()
  const [ searchValue, setSearchValue ] = useState('')
  const [ searchAll, setSearchAll ] = useState(false)
  const [ notes, setNotes ] = useState([])
  const [ showAddBtn, setShowAddBtn ] = useState(true)
  const [ showAddNote, setShowAddNote ] = useState(false)
  const [ showActionSheet, setShowActionSheet ] = useState(false)
  const [ isEdit, setIsEdit ] = useState(false)
  const [activeItem, setActiveItem] = useState({ _id: '' })

  const btnClass = useDynamicClass({
    'btn--all': searchAll
  }, 'btn')

  // 处理两个弹出层的显示隐藏的问题。以及弹窗消失后的激活状态问题
  useEffect(() => {
    if (!showAddNote && !showActionSheet) {
      resetActiveItem()
    }
    if (showAddNote && showActionSheet) {
      setShowActionSheet(false)
    }
  }, [showAddNote, showActionSheet])

  const fetchBookDetail = useCallback(async () => {
    const notes = await callCloud('searchNotes', { id: true_id, search: searchValue, searchAll })
    // const notes = await callCloud('getBook', { id: true_id })
    if (notes && notes.length) {
      setNotes(notes)
    }
  }, [searchValue, searchAll])
  const resetActiveItem = () => {
    setActiveItem({ _id: '' })
  }
  const handleCancel = () => {
    setShowActionSheet(false)
  }
  const handleAdd = useCallback(async note => {
    await callCloud('addNote', { id: true_id, ...note })
    await fetchBookDetail()
  }, [true_id])
  const deleteNote = async () => {
    await callCloud('deleteNote', { id: activeItem._id })
    await fetchBookDetail()
    setShowActionSheet(false)
  }
  const handleEdit = useCallback(async (note) => {
    await callCloud('editNote', { id: activeItem._id, note: note.note, comment: note.comment })
    await fetchBookDetail()
  }, [activeItem])
  const handleOpenEditModal = () => {
    setIsEdit(true)
    setShowAddNote(true)
  }
  const handleOpenAddModal = () => {
    setIsEdit(false)
    setShowAddNote(true)
  }
  const handleToLower = () => {
    setTimeout(() => setShowAddBtn(false), 1000)
  }
  const handleScroll = () => {
    if (showAddBtn) return
    setTimeout(() => setShowAddBtn(true), 500)
  }
  useEffect(() => {
    fetchBookDetail()
    // 动态改变标题
    const title = (searchAll && searchValue) ? '全部笔记' : bookName
    changeTitle(title)
  }, [fetchBookDetail])

  return <View className='book-detail'>
    <View className='header'>
      <Text className={btnClass} onClick={() => { setSearchAll(val => !val) }}>
        { searchAll ? '全部' : '本书' }
      </Text>
      <View className='search-bar'><AtSearchBar value={searchValue} onChange={setSearchValue} /></View>
    </View>
    <ScrollView style={{ height: '100vh' }} scrollY onScrollToLower={handleToLower} onScroll={handleScroll} >
      {
        notes.map(note => <NoteItem
          item={note}
          key={note._id}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setShowActionSheet={setShowActionSheet}
        />)
      }
    </ScrollView>
    {
      <AddNote
        isOpened={showAddNote}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        setShowAddNote={setShowAddNote}
        isEdit={isEdit}
        activeItem={activeItem}
      />
    }
    {
      showAddBtn && <View className='float-button'>
        <AtFab onClick={handleOpenAddModal}>
          <Text className='at-fab__icon at-icon at-icon-edit' />
        </AtFab>
      </View>
    }
    <AtActionSheet isOpened={showActionSheet} cancelText='取消' onClose={handleCancel}>
      <AtActionSheetItem onClick={handleOpenEditModal}>
        编辑
      </AtActionSheetItem>
      <AtActionSheetItem onClick={deleteNote}>
        删除
      </AtActionSheetItem>
    </AtActionSheet>
  </View>
}

