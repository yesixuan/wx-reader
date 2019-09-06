const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  return await db.collection('notes').doc(event.id).update({
    data: {
      note: event.note,
      comment: event.comment
    }
  })
}

// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//
//   const { result: { data } } = await cloud.callFunction({
//     name: 'getBook',
//     data: {
//       id: event.id
//     }
//   })
//
//   let res
//   if (data.notes && data.notes.length) {
//     res = await db.collection('books').doc(event.id).update({
//       data: {
//         notes: [...data.notes, { note: event.note, comment: event.comment }]
//       }
//     })
//   } else {
//     res = await db.collection('books').doc(event.id).update({
//       data: {
//         notes: [{ note: event.note, comment: event.comment }]
//       }
//     })
//   }
//   return res
// }
