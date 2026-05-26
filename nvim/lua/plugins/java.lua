return {
  'nvim-java/nvim-java',
  config = function()
    require('java').setup({
      java_debug_adapter = {
        enable = true
      },
      java_test = {
        enable = false
      },
      spring_boot_tools = {
        enable = false
      },
    })
    vim.lsp.enable('jdtls')
  end,
}
