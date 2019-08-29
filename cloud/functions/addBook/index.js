const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return db.collection('books').add(
    {
      data: {
        bookName: event.bookName,
        author: event.author
      }
    }
  )
}
