import { get } from "svelte/store";
import { store } from "../../../stores/core";

export const BASE_URI = get(store).meta.baseUri;