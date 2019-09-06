const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  if (!event.search) {
    return db.collection('notes').get()
  }
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
