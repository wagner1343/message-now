import queryString from "querystring";

import Qs from "qs";

export const parseQuery = (query) => queryString.parse(query);

const stringifyQuery = (query, opts) =>
    Qs.stringify(query, {
        arrayFormat: "brackets",
        encode: false,
        allowDots: true,
        ...opts
    });

export default stringifyQuery;
