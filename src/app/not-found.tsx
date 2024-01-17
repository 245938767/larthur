'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();
  return (
    <main className=" flex h-full flex-col items-center justify-center gap-2">
      <div className="pointer-events-none absolute inset-0 flex h-full w-full flex-col items-center justify-center">
        <motion.h1
          className="pointer-events-none select-none text-[25vmin] font-bold dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          404
        </motion.h1>

        <p className="pointer-events-none select-none ">
          Could not find the requested page
        </p>
        <br />
        <button
          onClick={() => router.back()}
          className="pointer-events-auto select-none text-xl font-bold text-white mix-blend-difference hover:underline"
        >
          返回上一页
        </button>
      </div>
    </main>
  );
}
