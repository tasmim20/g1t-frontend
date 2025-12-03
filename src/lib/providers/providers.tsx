// // /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { persistor, store } from "@/src/redux/store";
// import { Provider, useDispatch } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// export const Providers = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// };

// "use client";

"use client";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/redux/store";
import { setMemoryAccessToken } from "@/src/utils/auth/tokenService";
import { startTokenRefresh } from "@/src/helpers/tokenManager";

function AuthInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduxToken = store.getState().auth.accessToken;
    if (reduxToken) {
      setMemoryAccessToken(reduxToken);
      startTokenRefresh(reduxToken); // start proactive refresh
    }
  }, []);

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthInitializer>{children}</AuthInitializer>
      </PersistGate>
    </Provider>
  );
}
