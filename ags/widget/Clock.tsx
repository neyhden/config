import { createPoll } from "ags/time"
import { Metric } from "./Metric"
import { createComputed, createState } from "gnim"

export const Clock = () => {
  const time = createPoll("00:00:00", 1000, "date +'%H:%M:%S %d/%m/%Y'")
  const [currentClock, setCurrentClock] = createState(0)

  const switchClock = () => {
    if (currentClock() == 0) setCurrentClock(1)
    else setCurrentClock(0)
  }

  const clock = createComputed(() => {
    return time().split(' ')[currentClock()]
  })

  return (
    <Metric
      className="clock-metric"
      onLeftClick={switchClock}
      label={clock}
    />
  )
}
