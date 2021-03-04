# eventelo

Communicate React components using event-based hooks.

# Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [License](#license)

## Installation

You can install package using [npm](https://www.npmjs.com/package/eventelo) or [yarn](https://yarnpkg.com/):

```bash
npm i eventelo

yarn add eventelo
```

## Usage

```JSX
import { useSubscriber } from "eventelo";
import { useEffect, useState } from "react";

export const Sub = () => {
  const [state, setState] = useState("..");
  const { subscribe, unsubscribe, unsubscribeAll } = useSubscriber();

  useEffect(() => {
    // Subscribe callback to event by name "input"
    const key = subscribe("input", (data: string) => {
      setState(data);
    });

    return () => {
      // Unsubscribe from event by passing key returned from subscribe function
      unsubscribe(key);
    };
  }, [subscribe, unsubscribe]);

  return (
    <div>
      <p>{state}</p>
    </div>
  );
};

```

```JSX
import { useEmit } from "eventelo";
import { useState } from "react";

export const Emiter = () => {
  const [state, setState] = useState("");
  const { emit } = useEmit();

  return (
    <div>
      <input value={state} onChange={(e) => setState(e.currentTarget.value)} />
      <button onClick={() => emit("input", state)}>Emit event with data</button>
      <button onClick={() => emit("input")}>Emit event</button>
    </div>
  );
};
```

More [examples](https://github.com/Harasz/eventelo/tree/main/examples) of usage.
The best [example here](https://github.com/Harasz/use-async-modal/tree/main/src/events).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/Harasz/eventelo/blob/main/LICENSE)
