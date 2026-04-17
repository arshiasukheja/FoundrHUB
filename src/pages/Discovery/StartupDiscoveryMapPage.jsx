import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../../components/Layout/Navbar'
import Footer from '../../components/Layout/Footer'
import FilterPanel from '../../components/discovery/FilterPanel'
import MapView from '../../components/discovery/MapView'
import InfoCard from '../../components/discovery/InfoCard'

const ecosystemData = [
  {
    id: 1,
    name: 'PulseStack',
    description: 'FinOps automation for seed to Series A SaaS teams with weekly savings insights.',
    type: 'Startup',
    category: 'SaaS',
    city: 'Bengaluru',
    college: 'IISc',
    womenLed: true,
    verified: true,
    trending: true,
    views: 1840,
    saves: 221,
    growth: 28,
    x: 43,
    y: 62,
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 2,
    name: 'Nutriverse',
    description: 'D2C functional food brand focused on women health and personalized bundles.',
    type: 'D2C brand',
    category: 'D2C',
    city: 'Mumbai',
    college: 'IIT Bombay',
    womenLed: true,
    verified: true,
    trending: true,
    views: 1290,
    saves: 160,
    growth: 24,
    x: 36,
    y: 55,
    lat: 19.076,
    lng: 72.8777
  },
  {
    id: 3,
    name: 'AlgoHostel',
    description: 'Student founder network running AI hack nights and product showcases.',
    type: 'Student founder',
    category: 'Community',
    city: 'Delhi',
    college: 'DTU',
    womenLed: false,
    verified: false,
    trending: true,
    views: 980,
    saves: 88,
    growth: 31,
    x: 40,
    y: 39,
    lat: 28.6139,
    lng: 77.209
  },
  {
    id: 4,
    name: 'BuildCafe NCR',
    description: 'Startup cafe where founders host demo days and operator meetups.',
    type: 'Startup cafe',
    category: 'Offline Community',
    city: 'Delhi',
    college: 'NSUT',
    womenLed: false,
    verified: true,
    trending: false,
    views: 640,
    saves: 74,
    growth: 14,
    x: 41,
    y: 41,
    lat: 28.62,
    lng: 77.2
  },
  {
    id: 5,
    name: 'ForgeSpaces',
    description: 'Coworking floors with founder pods and weekly legal office hours.',
    type: 'Coworking space',
    category: 'Infrastructure',
    city: 'Pune',
    college: 'COEP',
    womenLed: false,
    verified: true,
    trending: false,
    views: 870,
    saves: 112,
    growth: 17,
    x: 39,
    y: 58,
    lat: 18.5204,
    lng: 73.8567
  },
  {
    id: 6,
    name: 'Hyderabad Build Week',
    description: 'Monthly startup event connecting PMF-stage startups with growth operators.',
    type: 'Startup event',
    category: 'Events',
    city: 'Hyderabad',
    college: 'IIIT Hyderabad',
    womenLed: false,
    verified: true,
    trending: true,
    views: 1430,
    saves: 194,
    growth: 26,
    x: 46,
    y: 66,
    lat: 17.385,
    lng: 78.4867
  },
  {
    id: 7,
    name: 'CampusCart',
    description: 'College startup building hyperlocal commerce for student communities.',
    type: 'College startup',
    category: 'Commerce',
    city: 'Chennai',
    college: 'IIT Madras',
    womenLed: true,
    verified: false,
    trending: false,
    views: 720,
    saves: 65,
    growth: 19,
    x: 47,
    y: 75,
    lat: 13.0827,
    lng: 80.2707
  },
  {
    id: 8,
    name: 'MentorMesh',
    description: 'Startup support network helping first-time founders with GTM mentorship.',
    type: 'Startup',
    category: 'SaaS',
    city: 'Jaipur',
    college: 'MNIT Jaipur',
    womenLed: true,
    verified: true,
    trending: false,
    views: 560,
    saves: 70,
    growth: 13,
    x: 34,
    y: 45,
    lat: 26.9124,
    lng: 75.7873
  },
  {
    id: 9,
    name: 'RiverRun D2C',
    description: 'Sustainable apparel brand with creator-led growth loops.',
    type: 'D2C brand',
    category: 'D2C',
    city: 'Kolkata',
    college: 'Jadavpur University',
    womenLed: false,
    verified: true,
    trending: true,
    views: 940,
    saves: 101,
    growth: 22,
    x: 56,
    y: 54,
    lat: 22.5726,
    lng: 88.3639
  },
  {
    id: 10,
    name: 'North Grid Labs',
    description: 'College startup accelerator connecting teams from tier-2 campuses.',
    type: 'College startup',
    category: 'Programs',
    city: 'Chandigarh',
    college: 'PEC',
    womenLed: true,
    verified: false,
    trending: false,
    views: 430,
    saves: 52,
    growth: 16,
    x: 36,
    y: 33,
    lat: 30.7333,
    lng: 76.7794
  }
]

const distance = (aLat, aLng, bLat, bLng) => {
  const toRad = (value) => (value * Math.PI) / 180
  const earthRadius = 6371
  const dLat = toRad(bLat - aLat)
  const dLng = toRad(bLng - aLng)
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  return earthRadius * y
}

const StartupDiscoveryMapPage = () => {
  const [filters, setFilters] = useState({
    city: '',
    college: '',
    categories: [],
    womenLed: false,
    verifiedOnly: false,
    trendingNearby: false
  })
  const [selectedStartup, setSelectedStartup] = useState(null)
  const [nearbyCity, setNearbyCity] = useState('')

  const cities = useMemo(() => [...new Set(ecosystemData.map((item) => item.city))].sort(), [])
  const colleges = useMemo(() => [...new Set(ecosystemData.map((item) => item.college))].sort(), [])

  useEffect(() => {
    if (!navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const closest = ecosystemData.reduce(
          (best, current) => {
            const km = distance(latitude, longitude, current.lat, current.lng)
            if (km < best.km) {
              return { city: current.city, km }
            }
            return best
          },
          { city: '', km: Infinity }
        )

        setNearbyCity(closest.city)
      },
      () => {
        setNearbyCity('')
      },
      { enableHighAccuracy: false, timeout: 6000 }
    )
  }, [])

  const filteredData = useMemo(() => {
    return ecosystemData.filter((item) => {
      if (filters.city && item.city !== filters.city) return false
      if (filters.college && item.college !== filters.college) return false
      if (filters.categories.length > 0 && !filters.categories.includes(item.type)) return false
      if (filters.womenLed && !item.womenLed) return false
      if (filters.verifiedOnly && !item.verified) return false
      if (filters.trendingNearby) {
        if (!item.trending) return false
        if (nearbyCity && item.city !== nearbyCity) return false
      }
      return true
    })
  }, [filters, nearbyCity])

  const cityMeta = useMemo(() => {
    return filteredData.reduce((acc, item) => {
      const current = acc[item.city] || { count: 0, trending: false }
      acc[item.city] = {
        count: current.count + 1,
        trending: current.trending || item.trending
      }
      return acc
    }, {})
  }, [filteredData])

  const trendingCities = useMemo(() => {
    return Object.entries(cityMeta)
      .filter(([, data]) => data.trending)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([city]) => city)
  }, [cityMeta])

  const trendingHotspots = useMemo(() => {
    const spotlightOrder = {
      Delhi: 1.35,
      Bengaluru: 1.18,
      Mumbai: 1.1,
      Hyderabad: 1.05
    }

    return Object.entries(cityMeta)
      .map(([city, data]) => {
        const items = filteredData.filter((item) => item.city === city)
        if (!items.length) {
          return null
        }

        const x = items.reduce((sum, item) => sum + item.x, 0) / items.length
        const y = items.reduce((sum, item) => sum + item.y, 0) / items.length
        const intensity = (data.count / Math.max(1, filteredData.length)) * (spotlightOrder[city] || 1)

        return {
          city,
          x,
          y,
          intensity,
          trending: data.trending,
          count: data.count
        }
      })
      .filter(Boolean)
      .sort((a, b) => b.intensity - a.intensity)
  }, [cityMeta, filteredData])

  const liveStats = useMemo(() => {
    const totalWeekly = filteredData.reduce((sum, item) => sum + Math.max(2, Math.round(item.growth * 0.3)), 0)
    return {
      active: filteredData.length,
      trendingCity: trendingCities[0] || filteredData[0]?.city || 'Delhi',
      weeklyDelta: totalWeekly
    }
  }, [filteredData, trendingCities])

  useEffect(() => {
    if (!selectedStartup) {
      return
    }

    const stillExists = filteredData.find((item) => item.id === selectedStartup.id)
    if (!stillExists) {
      setSelectedStartup(null)
    }
  }, [filteredData, selectedStartup])

  const handleChange = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }))
  }

  const toggleCategory = (category) => {
    setFilters((previous) => {
      const exists = previous.categories.includes(category)
      return {
        ...previous,
        categories: exists
          ? previous.categories.filter((item) => item !== category)
          : [...previous.categories, category]
      }
    })
  }

  const toggleFlag = (flag) => {
    setFilters((previous) => ({ ...previous, [flag]: !previous[flag] }))
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(circle_at_8%_2%,rgba(91,101,220,0.18),transparent_38%),radial-gradient(circle_at_90%_95%,rgba(18,32,86,0.10),transparent_35%),#FAFAFD] pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#5B65DC]">Discovery</p>
            <h1 className="mt-3 text-[clamp(2rem,4.8vw,3.3rem)] leading-[1.08] font-semibold text-[#122056]">Startup Discovery Map</h1>
            <p className="mt-3 text-base text-[#122056]/72">Explore startups, brands, and ecosystems across India.</p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-5">
            <FilterPanel
              cities={cities}
              colleges={colleges}
              filters={filters}
              onChange={handleChange}
              onToggleCategory={toggleCategory}
              onToggleFlag={toggleFlag}
              nearbyCity={nearbyCity}
              trendingCities={trendingCities}
              resultCount={filteredData.length}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
              <MapView
                items={filteredData}
                onSelect={setSelectedStartup}
                selectedCity={filters.city || nearbyCity}
                selectedStartup={selectedStartup}
                hotspots={trendingHotspots}
                cityMeta={cityMeta}
                liveStats={liveStats}
                empty={filteredData.length === 0}
              />

              <InfoCard
                startup={selectedStartup}
                nearbyCity={nearbyCity}
                similarStartups={filteredData
                  .filter((item) => selectedStartup && item.id !== selectedStartup.id && (item.category === selectedStartup.category || item.city === selectedStartup.city))
                  .slice(0, 3)}
                onClose={() => setSelectedStartup(null)}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default StartupDiscoveryMapPage
