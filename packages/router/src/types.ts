import type { data } from "react-router";

export type { To as LinkTo } from "react-router";
export type DataWithResponseInit<D> = ReturnType<typeof data<D>>;
