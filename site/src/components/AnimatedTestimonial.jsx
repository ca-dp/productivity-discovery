import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTestimonial = ({ testimonial }) => {
  return (
    <motion.div 
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div 
              className="relative w-32 h-32 mx-auto mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img 
                src={testimonial.avatarUrl} 
                alt={`${testimonial.name}のアバター`} 
                className="rounded-full border-4 border-white shadow-lg"
                width={128}
                height={128}
              />
              <div className="absolute bottom-0 right-0 bg-green-400 rounded-full w-6 h-6 border-2 border-white"></div>
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {testimonial.name}
            </motion.h3>
            <motion.p 
              className="text-blue-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {testimonial.position}
            </motion.p>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-2/3 p-8 flex flex-col justify-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-12 h-12 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>
          <motion.blockquote 
            className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            dangerouslySetInnerHTML={{ __html: testimonial.saying }}
          />
          <motion.div 
            className="flex items-center justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <a href={`https://twitter.com/${testimonial.handle.slice(1)}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {testimonial.handle}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedTestimonial;