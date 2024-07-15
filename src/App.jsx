import axios from "./utils/axios.customize"
import { useEffect } from "react"

function App() {

  useEffect(() => {
    const fetchHelloWorld = async() => {
      const res = await axios.get(`/v1/api`)
      console.log('🚀 ~ fetchHelloWorld ~ res:', res)
    }
    fetchHelloWorld()
  }, [])
  return (
    <>
    hello world
    </>
  )
}

export default App
