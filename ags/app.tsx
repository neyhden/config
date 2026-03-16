import app from "ags/gtk4/app"
import style from "./style.scss"
import { Bar } from "./widget/Bar"
import { execAsync } from "ags/process"
import { createBinding, For, This } from "gnim"
import { MprisWindow } from "./widget/MPRIS"

execAsync([ "bash", "-c", "inotifywait -q -r -e CLOSE_WRITE . && (ags quit; ags run)" ])
  .catch(e => print(e))

app.start({
  instanceName: "ags",
  css: style,
  icons: "./icons/",
  main() {
    const monitors = createBinding(app, "monitors")

    return (
      <For each={monitors}>
        {(monitor) => (
          <This this={app}>
            <Bar gdkmonitor={monitor} />
            <MprisWindow gdkmonitor={monitor} />
          </This>
        )}
      </For>
    )
  },
})
