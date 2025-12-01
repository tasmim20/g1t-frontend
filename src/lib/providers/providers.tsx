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

"use client";
import { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/redux/store";
import { initAxiosToken } from "@/src/helpers/axios/axiosInstance";

function AuthInitializer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize memory token from Redux after login or reload
    initAxiosToken();
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
