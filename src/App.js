import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import images from './images'
import Modal from "./Modal"


function App() {
  const initialScore = Number(window.localStorage.getItem('score') || 0)

  const [showModal, setShowModal] = useState()
  const [score, setScore] = useState(initialScore)
  const [playerChoice, setPlayerChoice] = useState()
  const [computerChoice, setComputerChoice] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    window.localStorage.setItem('score',score)
  }, [score])
  
  const resetGame = () => {
    setResult(null)
    setPlayerChoice(null)
    setComputerChoice(null)
  }

  const updateScore = (result) => {
    if (result === 'win') {
      setScore((score) => ++score)
    } else if (result === 'lose') {
      setScore((score) => --score)
    }
  }

  const declareWinner = (player, opponent) => {
    let outcomes = {
      rock: {
        rock: 'draw',
        paper: 'lose',
        scissors: 'win',
      },
      paper: {
        rock: 'win',
        paper: 'draw',
        scissors: 'lose',
      },
      scissors: {
        rock: 'lose',
        paper: 'win',
        scissors: 'draw',
      },
    }
    setResult(outcomes[player][opponent])
    updateScore(outcomes[player][opponent])
  }
  
  const opponentChoice = async () => {
    let choices = ['rock','paper','scissors']
    let option = Math.floor(Math.random()*3)
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        setComputerChoice(choices[option])
        resolve(choices[option])
      }, 1000)})
  }

  const playGame = (choice) => {
    setPlayerChoice(choice)
    opponentChoice().then((opponentChoice) => declareWinner(choice, opponentChoice))
  }

  return (
    <main className='pt-8'>
      <div className='flex justify-between max-w-[700px] mx-8 md:mx-auto border-2 border-header-outline rounded-sm sm:rounded-2xl'>
        <img className='mx-6 lg:mx-8 my-6 w-[83px] sm:w-auto self-center' src={images.logo} alt='rock paper scissors logo' />
        <div className='bg-white flex flex-col rounded-lg my-4 mx-6'>
          <div className='px-6 py-2 sm:px-8 sm:py-4 text-center'>
            <p className='uppercase text-score-text text-xs sm:text-base font-semibold tracking-[2.5px]'>Score</p>
            <p id='scoreboard' className='text-4xl sm:text-6xl font-bold text-score-count'>{score}</p>
          </div>
        </div>
      </div>
      { !playerChoice ? 
      <>
        <div className="mt-8 w-[312px] h-[282px] sm:w-[476px] sm:h-[430px] bg-[length:166px_188px] sm:bg-auto bg-no-repeat bg-center mx-auto bg-[url('./assets/bg-triangle.svg')]">
          <div className='flex justify-between'>
            <GameToken onClick={() => {playGame('paper')}} icon={images.paper} />
            <GameToken onClick={() => {playGame('scissors')}} icon={images.scissors} />
          </div>
          <div className='flex justify-center'>
            <GameToken onClick={() => {playGame('rock')}} icon={images.rock} />
          </div>
        </div>
        <div className='mt-8 sm:mt-0 sm:mr-8 flex justify-center sm:justify-end'>
          <button onClick={() => {setShowModal(true)}} className='px-9 py-3 uppercase text-white rounded-lg border-[1px] font-semibold text-base tracking-widest transition-all hover:bg-white focus:bg-white hover:text-dark-text focus:text-dark-text bg-transparent border-white'>
            Rules
          </button>
        </div>
        <AnimatePresence>
          {showModal && <motion.div className='fixed'
            key='modal'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}>
            <Modal setShowModal={setShowModal} />
          </motion.div>}
        </AnimatePresence>
      </> :
      <div className='m-4 lg:m-0 flex justify-center items-center'>
        <motion.div className='mr-4 lg:m-0'
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.25 }}
        >
        <Selection player='you' playerChoice={playerChoice} outcome={result}/>
        </motion.div>
        { result &&
          <motion.div className='absolute lg:static text-center bottom-[15%]'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ease: 'easeOut', duration: 0.15 }}
          >
            <p className='mb-4 text-5xl sm:text-6xl font-bold text-center text-white uppercase'>{result === 'win' ? 'You Win' : result === 'lose' ? 'You Lose' : 'Draw'}</p>
            <button onClick={() => resetGame()} className='px-14 py-3 bg-white text-dark-text rounded-lg cursor-pointer hover:text-[#DB2E4D] focus:text-[#DB2E4D] transition-all sm:text-base font-semibold uppercase tracking-[2.5px]'>Play Again</button>
          </motion.div>
        }
        <Selection player='the house' playerChoice={computerChoice} outcome={result === 'lose' ? 'win' : false}/>
      </div>
      }
    </main>
  )
}

const GameToken = ({ icon, onClick }) => {
  return (
    <button onClick={onClick} className='w-[130px] sm:w-[198px] cursor-pointer rounded-full transition-all focus:shadow-[0_0_0_14px_rgba(255,255,255,0.05)] sm:focus:shadow-[0_0_0_28px_rgba(255,255,255,0.05)] hover:shadow-[0_0_0_14px_rgba(255,255,255,0.05)] sm:hover:shadow-[0_0_0_28px_rgba(255,255,255,0.05)]'>
      <img src={icon} alt='game token' />
    </button>
  )
}

const Selection = ({ player, playerChoice, outcome }) => {

  return (
    <div className='sm:mx-14 flex flex-col-reverse lg:flex-col justify-between text-center'>
      <p className='py-4 sm:py-16 uppercase text-white font-bold text-sm sm:text-2xl tracking-[3px]'>{player} picked</p>
      <motion.div className='rounded-full'
        animate={outcome === 'win' ? { boxShadow: '0 0 0 42px rgba(255,255,255,0.05)' } : false}
        transition={{ ease: 'linear', duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
      <img className='w-max-[130px] sm:w-max-[198px] rounded-full self-center' src={!playerChoice ? images.circle : images[playerChoice]} alt='game token' />
      </motion.div>
    </div>
  )
}

export default App