//מעדכן את היוזר הנוכחי בסטור למה שמגיע
export function setUser(user) {
    return { type: 'SET_USER', payload: user }
}
// export function getUser(user) {
//     return { type: 'SET_USER', payload: user }
// }