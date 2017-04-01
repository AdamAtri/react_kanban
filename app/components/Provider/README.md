/// About PROVIDER

The `Provider` sets up a React context.
Context is an advanced feature that can be used to pass data through a component
hierarchy implicitly *without going through props*.

The `connect` higher-order function uses the context to dig the data we want
and then passes it to a component.

`Alt` - a library for managing data - will be dealt with by both `Provider` and `connect`


/// The Provider Module
The core of the *Provider Module* is `index.js`.
`index.js` will provide different contexts depending on the environment (ie.
  there are Provider instances for both development and production).

`AltContainer`, referred to in both the Provider files, enables us to connect
the data of our application at the component level when we implement `connect`.
