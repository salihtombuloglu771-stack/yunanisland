import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // React Compiler prep rule — flags idiomatic fetch-on-mount effects
      // (setState inside a named effect helper) as cascading-render risk.
      'react-hooks/set-state-in-effect': 'warn',
      // Same React Compiler prep rule set — flags Date.now()/new Date() calls
      // in async Server Components as "impure during render", but Server
      // Components execute once per request (no re-renders), so it doesn't apply.
      'react-hooks/purity': 'warn',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
