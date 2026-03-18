return {
  "zaldih/themery.nvim",
  config = function ()
    require("themery").setup({
      themes = {
        "catppuccin-frappe",
        "catppuccin-macchiato",
        "catppuccin-mocha",
        "catppuccin-latte",
        "dracula",
        "dracula-soft",
        "kanagawa-wave",
        "kanagawa-dragon",
        "kanagawa-lotus",
        "nordic",
        "onehalf-lush",
        "onehalf-lush-dark",
        "tokyonight-day",
        "tokyonight-moon",
        "tokyonight-night",
        "tokyonight-storm",
      },
      livePreview = true,
    })
		vim.keymap.set("n", "<leader>T", ":Themery<CR>", { desc = "Themery" })
  end
}

