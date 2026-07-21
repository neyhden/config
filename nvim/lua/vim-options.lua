local tabsize=2
local tab2=2
local tab4=4

vim.cmd("set expandtab")
vim.cmd("set tabstop=" .. tabsize)
vim.cmd("set softtabstop=" .. tabsize)
vim.cmd("set shiftwidth=" .. tabsize)
vim.cmd("set noswapfile")
vim.cmd("set number")
vim.cmd("set cindent")
vim.cmd("set cinoptions="..tabsize)
vim.cmd("set fillchars=eob:\\ ")
vim.cmd("set nowritebackup")
vim.cmd("tnoremap <Esc> <C-\\><C-n>")

vim.g.mapleader = " "

vim.keymap.set("n", "U", "<C-r>", {})
vim.keymap.set("n", "<S-Tab>", ":tabprevious<CR>", {})
vim.keymap.set("n", "<Leader>l", ":set invlist<CR>", { desc = "Toggle invis chars" })
vim.keymap.set("n", "<C-m>", "<C-6>", { desc = "Previous file" })

-- ctrl keymaps
vim.keymap.set("n", "<C-z>", "u", {})
vim.keymap.set("n", "<C-y>", "\"+yy", {})
vim.keymap.set("v", "<C-y>", "\"+y", {})
vim.keymap.set({"n", "v"}, "<C-p>", "\"+p", {})
vim.keymap.set("n", "<C-P>", "\"+P", {})
vim.keymap.set("n", "<C-t>", ":vsplit<CR>:terminal<CR>i", {})

-- Change movements (jk) to their "go" version
vim.keymap.set({"n", "v"}, "j", "gj", {})
vim.keymap.set({"n", "v"}, "k", "gk", {})
vim.keymap.set({"n", "v"}, "gb", "[{", {})
vim.keymap.set({"n", "v"}, "ge", "]}", {})

vim.o.sessionoptions = "blank,buffers,curdir,folds,help,tabpages,winsize,winpos,terminal,localoptions"
vim.o.winborder = "rounded"
vim.opt.relativenumber = false

-- Autocmds
local autocmd = vim.api.nvim_create_autocmd
local augroup = vim.api.nvim_create_augroup

autocmd('BufEnter', { -- Dont auto comment new lines 
    pattern = '',
    command = 'set fo-=c fo-=r fo-=o'
})

augroup('setIndent', { clear = true }) -- Set indentation depending on filetype
autocmd('Filetype', {
    group = 'setIndent',
    pattern = { 'css', 'scss', 'sass' },
    command = 'setlocal shiftwidth='..tabsize..' tabstop='..tabsize..' softtabstop='..tabsize..' cinoptions='..tabsize
})
autocmd('Filetype', {
    group = 'setIndent',
    pattern = { 'dart' },
    command = 'setlocal shiftwidth='..tabsize..' tabstop='..tabsize..' softtabstop='..tabsize..' cinoptions='..tabsize
})
autocmd('Filetype', {
    group = 'setIndent',
    pattern = { 'xml' },
    command = 'setlocal shiftwidth='..tab4..' tabstop='..tab4..' softtabstop='..tab4..' cinoptions='..tab4
})
