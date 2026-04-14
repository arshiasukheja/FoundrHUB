import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from './firebase'

export const useRealtimeValue = (path, initialValue) => {
  const [value, setValue] = useState(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!path) {
      setLoading(false)
      return undefined
    }

    const target = ref(db, path)
    const unsubscribe = onValue(
      target,
      (snapshot) => {
        setValue(snapshot.exists() ? snapshot.val() : initialValue)
        setLoading(false)
      },
      () => {
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [path, initialValue])

  return { value, loading }
}
