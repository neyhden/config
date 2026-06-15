return {
  "mfussenegger/nvim-dap",
  dependencies = {
    "rcarriga/nvim-dap-ui",
    "rcarriga/nvim-nio"
  },
  config = function ()
    local dap = require('dap')
    local dapui = require("dapui")

    dapui.setup()

    dap.listeners.before.attach.dapui_config = function()
      dapui.open()
    end
    dap.listeners.before.launch.dapui_config = function()
      dapui.open()
    end
    dap.listeners.before.event_terminated.dapui_config = function()
      dapui.close()
    end
    dap.listeners.before.event_exited.dapui_config = function()
      dapui.close()
    end

    vim.keymap.set("n", "<Leader>db", dap.toggle_breakpoint, { desc = "Toggle breakpoint" })
    vim.keymap.set("n", "<Leader>dc", dap.continue, { desc = "Continue" })
    vim.keymap.set("n", "<Leader>di", dap.step_into, { desc = "Step into" })
    vim.keymap.set("n", "<Leader>dv", dap.step_over, { desc = "Step over" })
    vim.keymap.set("n", "<Leader>do", dap.step_out, { desc = "Step out" })
    vim.keymap.set("n", "<Leader>dd", dap.disconnect, { desc = "Disconnect" })
    vim.keymap.set("n", "<Leader>du", dapui.toggle, { desc = "Toggle UI" })

    dap.configurations.java = {
      {
        type = 'java',
        request = 'attach',
        name = "Attach to Tomcat",
        hostName = "127.0.0.1",
        mainClass = "",
        port = 8000,
      },
    }
  end
}
