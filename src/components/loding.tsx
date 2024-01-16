import { RefreshIcon } from '@/assets';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute"
      >
        <RefreshIcon className=" dark:fill-white" />
      </motion.div>
    </AnimatePresence>
  );
}
