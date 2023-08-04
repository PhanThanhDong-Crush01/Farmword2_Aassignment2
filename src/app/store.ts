import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { counterReducer } from "../slices/Counter";
import { productReducer } from "../slices/Product";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { categoryReducer } from "@/slices/Category";
import { cartReducer } from "@/slices/Cart";

// Cấu hình persist ( lưu localStorage )
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["product", "products", "counter", "categories"],
};
const rootReducer = combineReducers({
  counter: counterReducer,
  products: productReducer,
  categories: categoryReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default persistStore(store);
export const persistor = persistStore(store);
