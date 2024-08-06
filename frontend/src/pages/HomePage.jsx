import useTitle from "../hooks/useTitle"

const HomePage = () => {

  useTitle("Home | " + import.meta.env.VITE_APP_NAME)

  return (
    <div>HomePage</div>
  )
}

export default HomePage