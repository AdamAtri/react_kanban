// About ACTIONS

Action are one of the core concepts of the Flux architecture. To be exact,
it is a good idea to separate *actions* from *action creators* (sometimes
  conflated, but considerably different).

- Action-creators are literally functions that *dispatch* actions
***think "Event" dispatching***

Model an *action* as a function that returns a function that then dispatches
individual actions as any asynchronous query progresses.


// actions
`Alt` provides a helper method known as `alt.generateActions` that can
generate simple action creators for us. They will simply dispatch the
data passed to them. 
