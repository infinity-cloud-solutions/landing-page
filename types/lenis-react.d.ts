declare module "lenis/react" {
  import * as React from "react";

  export type LenisRef = any;

  export const ReactLenis: React.ForwardRefExoticComponent<
    React.PropsWithChildren<{
      root?: boolean;
      options?: Record<string, any>;
    }> & React.RefAttributes<LenisRef>
  >;

  export default ReactLenis;
}
