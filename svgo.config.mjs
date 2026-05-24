export default {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeHiddenElems: {
            displayNone: false,
            isHidden: false
          },
          removeHiddenElems: {
            displayNone: false,
            isHidden: false
          },
          minifyStyles: false
        }
      }
    }
  ]
};
