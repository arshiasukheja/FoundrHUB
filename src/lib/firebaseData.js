import { get, ref, set, update } from 'firebase/database'
import { db } from './firebase'
import { buildDefaultUserData } from './seedData'

export const ensureUserData = async (uid, profile) => {
  const userRef = ref(db, `users/${uid}`)
  const snapshot = await get(userRef)

  if (!snapshot.exists()) {
    const data = buildDefaultUserData(profile)
    await set(userRef, data)
    return data
  }

  if (profile) {
    await update(ref(db, `users/${uid}/profile`), profile)
  }

  return snapshot.val()
}

export const updateUserProfile = async (uid, profile) => {
  if (!uid) return
  await update(ref(db, `users/${uid}/profile`), profile)
}
