import { createPoll } from "ags/time"

export const Clock = () => {
  const time = createPoll("00:00:00", 1000, "date +'%H:%M:%S'")

  return (
    <label class={"clock"} label={time} />
  )
}
