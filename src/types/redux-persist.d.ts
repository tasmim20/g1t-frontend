declare module "redux-persist/integration/react" {
  import { ComponentType } from "react";
  import { Persistor } from "redux-persist";

  interface PersistGateProps {
    loading?: React.ReactNode;
    persistor: Persistor;
    children?: React.ReactNode;
  }

  export const PersistGate: ComponentType<PersistGateProps>;
}
