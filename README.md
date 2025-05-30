# DeepSeek Native Wrapper

---

The repo contains 2 different things...
- A react native application that lets you chat with deepseek using ollama on a chat like interface. The relevant fils are in the wrapper and backend folder
- The NeoVim plugin. (More important) in the file called ollama_deepseek.lua

---

## NeoVim plugin
The nvim plugin lets you run a native deepseek-coder model inside of nvim and chat with it in a new buffer. It also formats your code in markdown and lets it look neat and organised with the support of any markdown plugins installed.

Dependencies:
- NeoVim
- lazyvim plugin manager for NeoVim
- Ollama
- Deepseek-coder-v2 installed via ollama

---

## Installation

- Copy the ollama_deepseek.lua file and paste it in the plugin directory (.config/nvim/lua/plugins/ollama_deepseek.lua)
- Reload Nvim and let the plugin install

## Usage

- Type :OllamarunChat in normal mode to start the service
- in the buffer type your query in the last line and press enter in normal mode
- wait for the AI response
- go to the last line and enter a new query

NOTE: keep in mind the query sent to the AI is only the last line of the file

Author: M S Dheeraj Murthy

