local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"https://github.com/folke/lazy.nvim.git",
		"--branch=stable", -- latest stable release
		lazypath,
	})
end
vim.opt.rtp:prepend(lazypath)

require("vim-options")
require("lazy").setup("plugins")

vim.treesitter.language.register('javascript', { 'jsp' })
vim.bo.indentexpr = "v:lua.require'nvim-treesitter'.indentexpr()"
vim.api.nvim_create_autocmd('BufEnter', {
  --pattern = "*",
  callback = function(args)
    local buf = args.buf
    local ft = vim.bo[buf].filetype
    local lang = vim.treesitter.language.get_lang(ft)
    if not lang then
      vim.cmd("syntax on")
      return
    end
    pcall(vim.treesitter.start, buf, lang)
  end,
})
