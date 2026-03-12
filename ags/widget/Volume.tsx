import AstalWp from "gi://AstalWp?version=0.1"
import { Metric } from "./Metric"
import { createBinding } from "gnim"

export const SpeakerVolume = () => {
  const speaker = AstalWp.get_default()!.get_audio()!.get_default_speaker()!

  return (
    <Metric
      iconName={createBinding(speaker, "volumeIcon")}
      label={createBinding(speaker, "volume").as(v => `${(v*100).toFixed(0)}%`)}
      onScrollUp={() => speaker.volume += 0.05}
      onScrollDown={() => speaker.volume -= 0.05}
      onLeftClick={() => speaker.mute = !speaker.mute}
    />
  )
}

export const MicVolume = () => {
  const mic = AstalWp.get_default()!.get_audio()!.get_default_microphone()!

  return (
    <Metric
      iconName={createBinding(mic, "volumeIcon")}
      label={createBinding(mic, "volume").as(v => `${(v*100).toFixed(0)}%`)}
      onScrollUp={() => mic.volume += 0.05}
      onScrollDown={() => mic.volume -= 0.05}
      onLeftClick={() => mic.mute = !mic.mute}
    />
  )
}
