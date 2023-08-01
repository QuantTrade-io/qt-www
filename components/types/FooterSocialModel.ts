import {
  ComponentOptionsMixin,
  DefineComponent,
  ExtractPropTypes,
} from "nuxt/dist/app/compat/capi";

export interface FooterSocialModel {
  text: string;
  to: string;
  icon: DefineComponent<
    {},
    {},
    {},
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    never[],
    never,
    PublicProps,
    Readonly<ExtractPropTypes<{}>> & {},
    {}
  >;
}
