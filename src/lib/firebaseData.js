import { get, ref, set, update } from 'firebase/database'
import { db } from './firebase'
import { buildDefaultUserData } from './seedData'

export const ensureUserData = async (uid, profile) => {
  const userRef = ref(db, `users/${uid}`)
  const snapshot = await get(userRef)
  const profileDefaults = {
    hasConnectedSources: false,
    ga_connected: false,
    payments_connected: false
  }

  if (!snapshot.exists()) {
    const data = buildDefaultUserData(profile)
    await set(userRef, data)
    return data
  }

  const existingProfile = snapshot.val()?.profile || {}
  const normalizedProfile = { ...profileDefaults, ...existingProfile, ...profile }

  if (profile || Object.keys(profileDefaults).some((key) => existingProfile[key] === undefined)) {
    await update(ref(db, `users/${uid}/profile`), normalizedProfile)
  }

  return snapshot.val()
}

export const updateUserProfile = async (uid, profile) => {
  if (!uid) return
  await update(ref(db, `users/${uid}/profile`), profile)
}
