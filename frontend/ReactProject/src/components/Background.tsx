import React from "react"
import { ReactNode } from "react"

const Background:React.FC<{children: ReactNode }> = ({children}) => {
    return <div className='bg-white dark:bg-gray-800'>{children}</div>
}

export default Background
