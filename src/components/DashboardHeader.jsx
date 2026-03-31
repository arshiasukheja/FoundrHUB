import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-4"
    />
  )
}

export default DashboardHeader
