import babel from "@babel/core";

const babelOptions = {
  babelrc: false,
  ignore: [/\/(build|node_modules)\//],
  plugins: [["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]],
};

//load is called on each of imports
export async function load (url, context, defaultLoad) {
  const result = await defaultLoad(url, context, defaultLoad)
  // imports look like this 
  //   [Object: null prototype] {
  //     format: 'module',
  //     responseURL: 'file:///Users/marlonneal/personal/projects/rsc-from-scratch/server.js',
  //     source: <Buffer 69 6d 70 6f 72 74 20 7b 20 63 72 65 61 74 65 53 65 72 76 65 72 20 7d 20 66 72 6f 6d 20 22 68 74 74 70 22 3b 0a 69 6d 70 6f 72 74 20 7b 20 72 65 61 64 ... 782 more bytes>
  //   }
  //   [Object: null prototype] {
  //     format: 'builtin',
  //     responseURL: 'node:http',
  //     source: null
  //   }
    // [Object: null prototype] {
    //   format: 'commonjs',
    //   responseURL: 'file:///Users/marlonneal/personal/projects/rsc-from-scratch/node_modules/react/jsx-runtime.js',
    //   source: null
    // }
  if(result.format === 'module') {
    const options = {
      filename: url,
      ...babelOptions
    }
    const transformedResult = await babel.transformAsync(result.source, options)
    return transformedResult 
      ? { format: 'module', source: transformedResult.code } 
      : result
  }
  return result
}