import { useEffect, useState } from "react"


const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log(error)
        }
    }
    return [storedValue, setValue]
}

const useScore = () => {
    const [savedScore, setSavedScore] = useLocalStorage('game-score')
    const score = savedScore

    useEffect(() => {
        if (!score) {
            setSavedScore(0)
        }
    })
    
    return [savedScore, setSavedScore]
}

export default useScore