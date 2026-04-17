import React from 'react'
import { motion } from 'framer-motion'

const nodes = [
  // Left side cluster
  { id: 1, x: '15%', y: '35%', size: 45, delay: 0.1, img: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, x: '22%', y: '55%', size: 65, delay: 0.2, img: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, x: '10%', y: '65%', size: 40, delay: 0.3, img: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, x: '28%', y: '40%', size: 55, delay: 0.4, img: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, x: '18%', y: '78%', size: 50, delay: 0.5, img: 'https://i.pravatar.cc/150?u=5' },
  
  // Center cluster
  { id: 6, x: '45%', y: '45%', size: 80, delay: 0.2, img: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, x: '38%', y: '30%', size: 40, delay: 0.6, img: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, x: '52%', y: '25%', size: 45, delay: 0.7, img: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, x: '40%', y: '70%', size: 55, delay: 0.8, img: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, x: '55%', y: '60%', size: 40, delay: 0.9, img: 'https://i.pravatar.cc/150?u=10' },

  // Right side cluster
  { id: 11, x: '75%', y: '35%', size: 60, delay: 0.3, img: 'https://i.pravatar.cc/150?u=11' },
  { id: 12, x: '85%', y: '50%', size: 75, delay: 0.4, img: 'https://i.pravatar.cc/150?u=12' },
  { id: 13, x: '70%', y: '65%', size: 50, delay: 1.0, img: 'https://i.pravatar.cc/150?u=13' },
  { id: 14, x: '80%', y: '75%', size: 45, delay: 1.1, img: 'https://i.pravatar.cc/150?u=14' },
  { id: 15, x: '90%', y: '25%', size: 35, delay: 1.2, img: 'https://i.pravatar.cc/150?u=15' },
  
  // More spread out nodes
  { id: 16, x: '30%', y: '20%', size: 35, delay: 1.3, img: 'https://i.pravatar.cc/150?u=16' },
  { id: 17, x: '65%', y: '20%', size: 40, delay: 1.4, img: 'https://i.pravatar.cc/150?u=17' },
  { id: 18, x: '25%', y: '85%', size: 45, delay: 1.5, img: 'https://i.pravatar.cc/150?u=18' },
  { id: 19, x: '60%', y: '85%', size: 35, delay: 1.6, img: 'https://i.pravatar.cc/150?u=19' },
  { id: 20, x: '48%', y: '10%', size: 30, delay: 1.7, img: 'https://i.pravatar.cc/150?u=20' },
]

// Define connections between node IDs
const connections = [
  [1, 2], [2, 3], [2, 4], [4, 6], [1, 4], [3, 5], [5, 9],
  [6, 7], [6, 8], [6, 9], [6, 10], [7, 16], [8, 17],
  [11, 12], [12, 13], [13, 14], [11, 17], [12, 15], [10, 13], [9, 19], [4, 16]
]

const StartupNetwork = () => {
  return (
    <section className="relative w-full min-h-[700px] py-24 overflow-hidden bg-white">

      {/* Header */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-6 mb-16">
        <motion.h4 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#122056]/40 mb-4"
        >
          Community Network
        </motion.h4>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight text-[#122056] mb-6"
        >
          SHARE YOUR STORIES
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[17px] text-[#122056]/60 leading-relaxed max-w-xl mx-auto"
        >
          Join the community of awesome people, tell your stories and share with all the world.
        </motion.p>
      </div>

      {/* Network Visualization Container */}
      <div className="relative w-full h-[600px] max-w-7xl mx-auto px-4">
        {/* SVG for Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5B65DC" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#5B65DC" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {connections.map(([startId, endId], idx) => {
            const start = nodes.find(n => n.id === startId)
            const end = nodes.find(n => n.id === endId)
            if (!start || !end) return null
            return (
              <motion.line
                key={`line-${idx}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 + idx * 0.05 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: 'spring', 
              stiffness: 100, 
              damping: 15, 
              delay: node.delay 
            }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            className="absolute cursor-pointer"
            style={{ 
              left: node.x, 
              top: node.y, 
              width: node.size, 
              height: node.size,
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <div className="group relative w-full h-full">
              {/* Outer Ring Animation */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                className="absolute inset-0 rounded-full bg-[#5B65DC]/10 -m-2 z-0"
              />
              
              {/* Avatar Image */}
              <div className="relative z-10 w-full h-full rounded-full border-2 border-white shadow-lg overflow-hidden bg-neutral-100">
                <img 
                  src={node.img} 
                  alt={`Startup ${node.id}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Tooltip hint on hover (optional) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#122056] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none">
                Startup Name
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}

export default StartupNetwork
