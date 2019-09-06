const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  await cloud.callFunction({
    name: 'deleteNotes',
    data: {
      id: event.id
    }
  })
  return db.collection('books').doc(event.id).remove()
}
