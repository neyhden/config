import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import AstalMpris from "gi://AstalMpris?version=0.1"
import { createBinding, For } from "gnim"
import { Metric } from "./Metric"
import GLib from "gi://GLib?version=2.0"

let mprisWinVis = 0
let mprisWinTimer: GLib.Source
const updateMprisWin = (delta: number) => {
  mprisWinVis += delta
  if (mprisWinVis > 0) {
    mprisWinTimer && clearTimeout(mprisWinTimer)
    app.get_window("mpris")!.visible = true
  } else {
    mprisWinTimer = setTimeout(() => {
      app.get_window("mpris")!.visible = false
    }, 20)
  }
}

export const MprisWindow = ({ gdkmonitor }:{ gdkmonitor: Gdk.Monitor }) => {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name={`mpris`}
      keymode={Astal.Keymode.ON_DEMAND}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={ TOP | RIGHT }
      application={app}
      marginTop={32}
      marginRight={230}
    >
      <Gtk.EventControllerMotion
        onEnter={() => updateMprisWin(1)}
        onLeave={() => updateMprisWin(-1)}
      />
      <Mpris />
    </window>
  )
}

export const MprisToggle = () => {
  return (
    <Metric
      iconName={"multimedia-player-symbolic"}
      onHoverEnter={() => updateMprisWin(1)}
      onHoverExit={() => updateMprisWin(-1)}
    />
  )
}

export const Mpris = () => {
  const mpris = AstalMpris.get_default()
  const players = createBinding(mpris, "players")
  const v = Gtk.Orientation.VERTICAL
  const c = Gtk.Align.CENTER

  return (
    <box orientation={v}>
      <For each={players}>
        {player =>
          <box orientation={v}>
            <box spacing={16}>
              <image file={createBinding(player, "coverArt")} pixelSize={128} />
              <box orientation={v} valign={c} spacing={8}>
                <label label={createBinding(player, "title")} />
                <label label={createBinding(player, "artist")} />
              </box>
            </box>
            <box orientation={v} spacing={8}>
              <box spacing={16} halign={c}>
                <button iconName={"media-skip-backward-symbolic"}></button>
                <button iconName={createBinding(player, "playbackStatus").as(s => s == AstalMpris.PlaybackStatus.PAUSED ? "media-playback-start-symbolic" : "media-playback-pause-symbolic")} onClicked={() => player.play_pause()}></button>
                <button iconName={"media-skip-forward-symbolic"}></button>
              </box>
              <slider value={player.position} />
            </box>
          </box>
        }
      </For>
    </box>
  )
}

