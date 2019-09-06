const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  if (!event.search && !event.searchAll) { // 搜索一本书中的全部笔记
    return db.collection('notes').where({
      bookId: event.id
    }).get()
  }
  if (event.search && event.searchAll) {
    return db.collection('notes').where(_.or([
      {
        note: {
          $regex:'.*'+ event.search,
          $options: 'i'
        }
      },
      {
        comment: {
          $regex:'.*'+ event.search,
          $options: 'i'
        }
      }
    ])).get()
  }
  return db.collection('notes').where(_.and({
    bookId: event.id
  }, _.or([
    {
      note: {
        $regex:'.*'+ event.search,
        $options: 'i'
      }
    },
    {
      comment: {
        $regex:'.*'+ event.search,
        $options: 'i'
      }
    }
  ]))).get()
}
