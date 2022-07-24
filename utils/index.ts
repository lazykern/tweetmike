export const clearObjectFaulty = (objectInput: object) => {
  const objectCopy: {[key: string]: any} = {...objectInput};

  for (const key in objectCopy) {
    if (typeof objectCopy[key] === 'number' && objectCopy[key]) {
      continue;
    }

    if (typeof objectCopy[key] === 'boolean' && objectCopy[key] === true) {
      continue;
    }

    if (objectCopy[key] === null || objectCopy[key] === undefined) {
      delete objectCopy[key];
      continue;
    }

    if (
      typeof objectCopy[key] === 'object' &&
      !Array.isArray(objectCopy[key])
    ) {
      objectCopy[key] = clearObjectFaulty(objectCopy[key]);
    }

    if (Object.keys(objectCopy[key]).length === 0) {
      delete objectCopy[key];
    }
  }

  return objectCopy;
};

export const updateRequestBodyProperty = (
  requestBody: object,
  property: string,
  value: any
) => {
  let newRequestBody: {[key: string]: any} = {};

  if (property.includes('.')) {
    const [parent, child] = property.split('.');
    // @ts-ignore
    newRequestBody[parent] = updateRequestBodyProperty(
      // @ts-ignore
      requestBody[parent] || {},
      child,
      value
    );
  } else {
    newRequestBody = {...requestBody, [property]: value};
  }
};
