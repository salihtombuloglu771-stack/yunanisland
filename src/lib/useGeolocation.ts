import { useState } from 'react'

interface GeolocationState {
  coords: { lat: number; lng: number } | null
  loading: boolean
  error: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ coords: null, loading: false, error: null })

  const request = () => {
    if (!navigator.geolocation) {
      setState({ coords: null, loading: false, error: 'unsupported' })
      return
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: { lat: position.coords.latitude, lng: position.coords.longitude },
          loading: false,
          error: null,
        })
      },
      () => {
        setState({ coords: null, loading: false, error: 'denied' })
      },
      { timeout: 10000 }
    )
  }

  return { ...state, request }
}
