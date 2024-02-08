```mermaid
stateDiagram-v2
[*] --> off
off --> on: start
on --> off: stop
on --> [*]: destroy
```
