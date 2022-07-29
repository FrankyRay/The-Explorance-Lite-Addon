# Dynamic Property

Dynamic property is some of great feature added to Gametest. It's works same as tags or scoreboard. This is useful if your script would have some configuration. The value can be save into player (personal) or world (global).

## How to use?

We need event listener to save the value inside dynamic property. `worldInitialize` is the event for dynamic property

```js
world.events.worldInitialize.subscribe((eventData) => {
  // Code
});
```

Inside the event, we need to initialize the property first. Dynamic property can save 3 value types, `string`, `number`, and `boolean`.

```js
// Initiialize Dynamic Property
let dynamicProperty = new DynamicPropertiesDefinition();
dynamicProperty.defineString("varString", 20);
dynamicProperty.defineNumber("varNumber");
dynamicProperty.defineBoolean("varBoolean");
```
