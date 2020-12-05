exports.handle = (promise) =>
  promise
    .then((data) => [data, undefined])
    .catch((error) =>
      Promise.resolve([
        undefined,
        error
          ? error
          : [
              {
                location: 'handle',
                param: '',
                msg: 'an error has occured',
                value: '',
              },
            ],
      ])
    );
