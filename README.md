# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



https://medium.com/@farhoddev/how-to-create-a-reusable-react-button-component-bac643ca4594
https://dev.to/frontenddeveli/simple-mutations-with-tanstack-query-and-nextjs-4b0m
https://strictlywebdev.com/blog/json-server-put-patch-post-delete/
https://shekhargulati.com/2019/07/10/how-to-setup-json-server-to-use-custom-id-and-route/
https://quickref.me/generate-an-unique-and-increment-id.html
[https://paletton.com/#uid=73g0S0kqUjc9ko8iOm3AXfQSRbN
]()https://strictlywebdev.com/blog/json-server-put-patch-post-delete/