import images from './images'
import { motion } from 'framer-motion'

const Modal = ({ setShowModal }) => {
  return (
    <div className='bg-black bg-opacity-50 inset-0 fixed grid place-content-center'>
          <motion.div className='w-screen h-screen sm:h-auto sm:max-w-[400px] bg-white flex flex-col justify-around sm:rounded-lg sm:shadow-md'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ease: 'easeOut', duration: 0.25 }}
          >
              <div className='sm:m-8 flex justify-center sm:justify-between'>
                  <h2 className='uppercase text-dark-text font-bold text-3xl'>Rules</h2>
                  <input className='self-center hidden sm:block' type='image' onClick={() => {setShowModal(false)}} src={images.close} alt='close icon'/>
              </div>
              <img className='mx-auto sm:m-12' src={images.rules} alt='game rules'/>
              <input className='self-center sm:hidden' type='image' onClick={() => {setShowModal(false)}} src={images.close} alt='close icon'/>
          </motion.div>
    </div>
  )
}

export default Modal