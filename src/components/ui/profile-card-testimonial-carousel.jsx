"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { 
  FaGithub as Github, 
  FaXTwitter as Twitter, 
  FaYoutube as Youtube, 
  FaLinkedin as Linkedin 
} from "react-icons/fa6";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Vansh Sukheja",
    title: "Co-Founder & Lead Engineer, FoundrHUB",
    description:
      "Our mission is to empower student founders by providing them with the tools and network they usually find only in top-tier accelerators. We're building the future of campus entrepreneurship in India.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Arshia Sukheja",
    title: "Co-Founder & Product Lead, FoundrHUB",
    description:
      "We believe that every student with an idea should have the right guidance at the right time. FoundrHUB is more than a platform—it's a movement to bring India's best student minds together.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
];

export function TestimonialCarousel({ className }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className='hidden md:flex relative items-center justify-center'>
        {/* Avatar */}
        <div className='w-[380px] h-[380px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-neutral-800 flex-shrink-0 shadow-2xl'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className='w-full h-full object-cover'
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className='bg-white/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 ml-[-60px] z-10 max-w-lg flex-1'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-[#0A194E] mb-2'>
                  {currentTestimonial.name}
                </h2>

                <p className='text-sm font-medium text-[#7DA0D9]'>
                  {currentTestimonial.title}
                </p>
              </div>

              <p className='text-[#0A194E] text-base leading-relaxed mb-8'>
                {currentTestimonial.description}
              </p>

              <div className='flex space-x-4'>
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url || "#"}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-12 h-12 bg-[#0A194E] rounded-full flex items-center justify-center transition-all hover:bg-[#7DA0D9] hover:scale-105 cursor-pointer'
                    aria-label={label}
                  >
                    <IconComponent className='w-5 h-5 text-white' />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className='md:hidden max-w-sm mx-auto text-center bg-transparent'>
        {/* Avatar */}
        <div className='w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl overflow-hidden mb-6'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className='w-full h-full object-cover'
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className='px-4'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className='text-xl font-bold text-[#0A194E] mb-2'>
                {currentTestimonial.name}
              </h2>
              
              <p className='text-sm font-medium text-[#7DA0D9] mb-4'>
                {currentTestimonial.title}
              </p>
              
              <p className='text-[#0A194E] text-sm leading-relaxed mb-6'>
                {currentTestimonial.description}
              </p>
              
              <div className='flex justify-center space-x-4'>
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url || "#"}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-12 h-12 bg-[#0A194E] rounded-full flex items-center justify-center transition-all hover:bg-[#7DA0D9] cursor-pointer'
                    aria-label={label}
                  >
                    <IconComponent className='w-5 h-5 text-white' />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className='flex justify-center items-center gap-6 mt-8'>
        <button
          onClick={handlePrevious}
          aria-label='Previous testimonial'
          className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer'
        >
          <ChevronLeft className='w-6 h-6 text-[#0A194E]' />
        </button>

        <div className='flex gap-2'>
          {testimonials.map((_, testimonialIndex) => (
            <button
              key={testimonialIndex}
              onClick={() => setCurrentIndex(testimonialIndex)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                testimonialIndex === currentIndex
                  ? "bg-[#0A194E]"
                  : "bg-gray-300"
              )}
              aria-label={`Go to testimonial ${testimonialIndex + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label='Next testimonial'
          className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer'
        >
          <ChevronRight className='w-6 h-6 text-[#0A194E]' />
        </button>
      </div>
    </div>
  );
}
