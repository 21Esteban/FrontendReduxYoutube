import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    appStore: appReducer,
  },
  devTools: process.env.NODE_ENV === "production",


  // este middleware se usa por que sale un error a la hora de usar reducer setvideoToEdit, por el formato de la fecha, con esto se corrige, encontrado en la documentacion
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
