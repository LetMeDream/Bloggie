import { useEffect, useState } from 'react'
import { setUser } from '../utils/auth'
import PropTypes from 'prop-types'

import { ReactNode } from 'react'

interface MainWrapperProps {
  children: ReactNode
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  // Initialize the 'loading' state variable and set its initial value to 'true'
  const [loading, setLoading] = useState(true)

  // Define a useEffect hook to handle side effects after component mounting
  useEffect(() => {
    // Define an asynchronous function 'handler'
    const handler = async () => {
      // Set the 'loading' state to 'true' to indicate the component is loading
      setLoading(true)

      // Perform an asynchronous user authentication action
      await setUser()

      // Set the 'loading' state to 'false' to indicate the loading process has completed
      setLoading(false)
    }

    // Call the 'handler' function immediately after the component is mounted
    handler()
  }, [])

  // Render content conditionally based on the 'loading' state
  return (
    <>
      {loading
        ? null
        : (
          <div className='vh-100 d-flex flex-column'>{children}</div>
          )}
    </>
  )
}

export default MainWrapper

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired // Validate 'children' prop
}
