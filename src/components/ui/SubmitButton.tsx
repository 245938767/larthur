import { ErrorIcon, RefreshIcon, SuccessIcon } from '@/assets';
import { AnimatePresence, motion } from 'framer-motion';

import { clsxm } from '@/lib/helper';

export type SubmitButtonState = 'Normal' | 'Loading' | 'Error' | 'Success';
type SubmitButtonProps = {
  buttonState: SubmitButtonState;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function SubmitButton({
  buttonState = 'Normal',
  className,
  children = 'Submit',
  ...props
}: SubmitButtonProps) {
  return (
    <>
      <div className="mr-6 mt-3 flex ">
        <AnimatePresence>
          {buttonState === 'Loading' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="  absolute "
            >
              <RefreshIcon className=" justify-center  align-middle dark:fill-white" />
            </motion.div>
          )}
          {buttonState === 'Success' && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                rotate: 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              className="absolute"
            >
              <SuccessIcon className=" justify-center  fill-green-500 align-middle" />
            </motion.div>
          )}
          {buttonState === 'Error' && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                rotate: 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              className="absolute"
            >
              <ErrorIcon className=" justify-center  fill-red-500 align-middle" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        <motion.div
          className={clsxm(
            ' w-20 pointer-events-auto relative flex h-10 rounded-full transition-opacity duration-500 hover:opacity-100',
            'rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90',
            'shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md',
            'dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10',
            '[--spotlight-color:rgb(236_252_203_/_0.6)] dark:[--spotlight-color:rgb(217_249_157_/_0.07)]'
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{
            scale: 0.8,
            rotate: 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 25 }}
        >
          <button
            disabled={buttonState === 'Loading'}
            className={clsxm(
              ' bg-transparent px-4 py-2 text-sm font-medium hover:text-lime-600 dark:hover:text-lime-400',
              className
            )}
            {...(props as any)}
          >
            {children}
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
