import { InjectionToken } from "@angular/core";
import { AuthCommandApiMap, DefaultRedirects } from "./interfaces";

export const AUTH_DEFAULT_REDIRECTS = new InjectionToken<DefaultRedirects>("DefaultRedirects");

export const AUTH_COMMAND_API_MAP = new InjectionToken<AuthCommandApiMap>("AuthCommandApiMapToken");