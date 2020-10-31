import React, { useState, useRef, useCallback, useMemo, Fragment } from 'react'
import { 
  Grid,
  TextField,
  Button,
  Checkbox,
} from '@material-ui/core'

//these are some pretty neat hooks
const PlaygroundView = ({ initial }) => {
  const [checks, setChecks] = useState([false, false, false, false])
  const initialChecks = useMemo(() => [false, false, false, false], []) //memoizing constants
  //const initialChecks = [false, false, false, false]
  //^^ this would fail because initialChecks would be recreated once playgroundview rerenders
  const uncontrolledRef = useRef()

  const call = useCallback(() => {
    console.log(uncontrolledRef.current.value)
  }, []) //memoizing functions

  const callcheck = useCallback(() => {
    console.log(initialChecks)
  }, [initialChecks]) //memoizing functions

  const callstatefulcheck = useCallback(() => {
    console.log(checks)
  }, [checks]) //memoizing functions

  //only statey components rerender!
  console.log('renders')

  return (
    <Grid>
      {useMemo(() => (
        <Button onClick={call}>
          call!
        </Button>
      ), [call])}
      {useMemo(() => (
        <Button onClick={callcheck}>
          call check!
        </Button>
      ), [callcheck])}
      {useMemo(() => (
        <Button onClick={callstatefulcheck}>
          call stateful check!
        </Button>
      ), [callstatefulcheck])}
      <UncontrolledText 
        text={'test'} 
        uncontrolledRef={uncontrolledRef}
        call={call}
      />
      <HackyCheckboxes initialChecks={initialChecks} />
      <Grid>
        <StateyCheckboxes checks={checks} setChecks={setChecks} />
      </Grid>
    </Grid>
  )
}

const UncontrolledText = React.memo(({ text, uncontrolledRef }) => {
  return (
    <Grid>
      <TextField
        label={'uncontrolled'}
        defaultValue={text}
        inputRef={uncontrolledRef}
      />
    </Grid>
  )
})

//this is uncontrolled but using initialChecks as a stateish thing
//initialchecks is memoized so it maintains its state even after playgroundview rerenders
const HackyCheckboxes = React.memo(({ initialChecks }) => {
  return (
    <Grid>
      {initialChecks.map((check, index) => (
        <Checkbox
          id={index} 
          value={check}
          onChange={() => {
            initialChecks[index] = !initialChecks[index]
          }}
        />
      ))}
    </Grid>
  )
})


//statey checkboxes rerender, but memoized single checkbox does not
const StateyCheckboxes = ({ checks, setChecks }) => {

  const handleCheck = useCallback(index => {
    checks[index] = !checks[index]
    setChecks([...checks])
  }, [])

  return (
    <Fragment>
      {checks.map((check, index) => (
        <MemoizedCheckBox
          id={index} 
          check={check}
          index={index}
          handleCheck={handleCheck}
        />
      ))}
    </Fragment>
  )
}

const MemoizedCheckBox = React.memo(({ check, index, handleCheck }) => {
  return (
    <Checkbox
      checked={check}
      onChange={e => handleCheck(index)}
    />
  )
})


export default PlaygroundView