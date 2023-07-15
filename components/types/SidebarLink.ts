import {
  FunctionalComponent,
  HTMLAttributes,
  VNodeProps,
} from "nuxt/dist/app/compat/capi";

export interface PropsSidebarLink {
  text: string;
  to: string;
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
}
