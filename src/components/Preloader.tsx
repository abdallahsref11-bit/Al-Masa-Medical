import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-cream overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <Logo size={120} />
          </motion.div>

          <div className="relative flex flex-col items-center mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col items-center gap-4 mb-8"
            >
              <h2 className="text-4xl md:text-6xl font-arabic font-bold text-brand-dark tracking-tight text-center" dir="rtl">
                مركز الماسة الطبي
              </h2>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "240px" }}
              transition={{ delay: 1.2, duration: 1.2, ease: "circOut" }}
              className="h-1 bg-brand-gold mb-8 shadow-sm shadow-brand-gold/20"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-brand-gold font-bold tracking-widest uppercase text-sm font-arabic"
            >
              صحتكم أولويتنا القصوى
            </motion.p>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.5, ease: "linear" }}
              className="h-full bg-brand-gold"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
