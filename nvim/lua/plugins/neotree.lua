return {
  "nvim-neo-tree/neo-tree.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-tree/nvim-web-devicons",
    "MunifTanjim/nui.nvim",
  },
  config = function()
    require("neo-tree").setup({
      filesystem = {
        filtered_items = {
          visible = false,
          show_hidden_count = true,
          hide_dotfiles = false,
          hide_gitignored = true,
        },
        follow_current_file = {
          enabled = true,
          leave_dirs_open = false,
        },
      },
      buffers = { follow_current_file = { enable = true } },
    })
    vim.keymap.set("n", "<leader>e", function()
      require("neo-tree.command").execute({
        toggle = false,
        source = "filesystem",
        position = "left",
      })
    end)
    vim.keymap.set("n", "<leader>E", function()
      require("neo-tree.command").execute({
        toggle = true,
        source = "filesystem",
        position = "left",
      })
    end)
  end,
}
