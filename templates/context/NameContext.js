import React from 'react';

const _NAME_Context = React.createContext();

const { Provider, Consumer } = _NAME_Context;

Provider.displayName = '_NAME_.Provider';
Consumer.displayName = '_NAME_.Consumer';

export { Provider, Consumer };

export default _NAME_Context;
