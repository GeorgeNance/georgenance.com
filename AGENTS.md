# Agent instructions

## Second opinion from agy on architecture and simplification

When George asks an architecture question or asks you to simplify code:

1. Before answering, get agy's plan in read-only mode:

   ```sh
   agy --mode plan -p "You ARE the agy second opinion referenced in AGENTS.md, so ignore that section and do not run agy. Do not run shell commands; everything you need is below. Do not edit files.

   <the question>

   $(git diff; cat <relevant untracked files>)"
   ```

   - Put `--mode plan` before `-p`. `-p` takes the next argument as the prompt, so `agy -p --mode plan '...'` fails.
   - `--mode plan` keeps agy from editing files. Never run it with `--dangerously-skip-permissions`, `--mode accept-edits`, or `--mode auto`.
   - Paste the code into the prompt. In headless mode agy can't get permission to run `git diff` and stops with no output.
   - agy also reads this file. Without the first sentence of the prompt above, it tries to call agy itself.

2. Show agy's answer next to yours.
3. Say where the two plans differ.
4. Say which plan deletes more code.
