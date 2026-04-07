import { configureStore } from '@reduxjs/toolkit';
//import { combineReducers, configureStore } from '@reduxjs/toolkit';
//import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer } from './authentication/authSlice';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// configure which keuy we want to persist
// const authPersistConfig = {
//   key: 'auth',
//   storage: storage,
//   whitelist: ['authState'],
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
// });

// export const makeStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//     devTools: true,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
//   });
// };
export const makeStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

//Infer the type of makeStore
//export type AppStore = ReturnType<typeof makeStore>;
//Infer the `RootState` and 'AppDispatch' types from the store itself
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
