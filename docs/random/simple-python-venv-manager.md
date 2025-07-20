# A Simple Python venv Manager

Recently, while working on multiple Python projects, I faced some problems with how scattered my virtual environments were. Some were in the project folders, some outside, and I couldn’t remember which ones were important and which ones I could delete.

There are great tools like Anaconda, Mamba, Poetry, etc. — but they are heavy and come with more features than I needed. I just wanted something lightweight. Something that uses Python's own built-in `venv` and lets me keep everything in one place. And I think if you're just hacking on side projects, scripts, or learning Python — these tools might feel like overkill.

So I wrote **venvman** — a tiny Bash script to create, activate, delete, and list Python virtual environments.
You can find the project on GitHub [here](https://github.com/neo-0007/venvman).

I didn’t need dependency resolution or Python version management. I just wanted:
- A centralized place for all venvs (no more searching in random project folders)
- A simple CLI command like `venvman create myproject`
- Quick activation from anywhere in the terminal
- Easy cleanup of unused venvs

That’s it. And I wanted it in one script — no dependencies, no config files, just pure Bash.


## What does venvman do?

Once installed, it gives you these commands:

```bash
venvman create <name>     # Create a new virtual environment
vactivate <name>          # Activate an existing environment
vdeactivate <name>        # Deactivate the current venv
venvman list              # See all venvs
venvman delete <name>     # Delete a venv you don’t need anymore
```

It stores all environments under `~/.venvs/`

So now I can do:
```bash
venvman create testapi
vactivate testapi
```

## Limitations
This is not a replacement for Anaconda, Mamba, or Poetry.
It does **not**:
- Manage Python versions (you’ll need `pyenv` or something similar for that)
- Handle `requirements.txt` or `pyproject.toml`
- Install any packages for you
It simply wraps the standard `python3 -m venv` and gives you CLI access to keep it all clean and centralized.
Right now, it only works on **Linux** or **Bash-compatible shells**. If you're on macOS (which defaults to `zsh`) or Windows (CMD or PowerShell), it won’t run without tweaks. But — if you want to help port it, raise a PR.


## Installation

Clone the repo and run the setup:
```bash
git clone https://github.com/neo-0007/venvman.git
cd venvman
bash setup.sh
```
This adds the `venvman` command globally (via `~/bin`) and appends a function + alias to your `.bashrc`.

To uninstall:
```bash
bash uninstall.sh
```

Fork it. Hack it. Improve it. That’s the fun part :)
