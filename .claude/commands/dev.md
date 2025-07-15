---
description: "Manage development server (start/stop)"
allowed-tools: ["bash"]
---

Please run the appropriate command based on the argument:

If argument is "start":
- Run: `npm run dev > dev.log 2>&1 & echo $! > dev.pid`
- Then confirm the server is running by checking the log

If argument is "stop":
- Run: `if [ -f dev.pid ]; then kill $(cat dev.pid) && rm dev.pid; else echo 'No dev server running'; fi`

Arguments: $ARGUMENTS