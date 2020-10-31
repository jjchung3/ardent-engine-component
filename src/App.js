import React, { useState } from 'react'
import { 
  Grid,
  Button,
} from '@material-ui/core'
import './App.css'
import PlaygroundView from './PlaygroundView'

function App() {
  const [reset, setReset] = useState(false)

  return (
    <Grid className="App">
      <Button onClick={() => {setReset(!reset)}}>
        rerender App
      </Button>
      <PlaygroundView />
    </Grid>
  )
}

export default App
