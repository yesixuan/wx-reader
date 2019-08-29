const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (!event.search) {
    return db.collection('books').get()
  }
  return db.collection('books').where(_.or([
    {
      bookName: {
        $regex:'.*'+ event.search,
        $options: 'i'
      }
    },
    {
      author: {
        $regex:'.*'+ event.search,
        $options: 'i'
      }
    }
  ])).get()
}
