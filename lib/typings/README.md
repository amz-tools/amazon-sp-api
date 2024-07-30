# Adding your own types to `callAPI`

A full list of the Amazon selling partner api operations for `callAPI` can be found [here](https://github.com/amzn/selling-partner-api-docs/tree/main/references).

To add your own `callAPI` typings:

1. Add the operation to the `type Operation = ...` in `index.d.ts`
1. Create a file in `typings/operations` where the filename is the operation category (For example, we would want `orders` vs `getOrders`)
1. In that file, add the interface exports.
   - Look at the parameters in the documentation to see what is needed. Each operation will have Query, Path, Body, or a combination of them.
   - If we were typing `getOrders`, we would export `GetOrdersQuery` since the only parameter is Query.
     - The naming convention is `OperationName` plus `ParameterType`. So `GetOrdersQuery` or `GetOrdersBody` or `GetOrdersPath`.
   - We would also create and export the interface `GetOrdersResponse` to type the response of this operation.
1. Once we have the interfaces, you can add them as a conditional typing to their respective types in `index.d.ts`.
   - A Query parameter would be added to `type QueryType..`, Path `type PathType..`, and Body `type BodyType..`. You can follow the existing structure.
