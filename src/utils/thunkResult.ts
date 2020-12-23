import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { AppAction, AppState } from "../app";

type ThunkResultCommon<R> = ThunkAction<R, AppState, { api: any }, AppAction>;
export type ThunkResult<TAction> = ThunkResultCommon<Promise<TAction | undefined>>;

export type AppDispatch<TAction> = Dispatch<ThunkResult<TAction>>;