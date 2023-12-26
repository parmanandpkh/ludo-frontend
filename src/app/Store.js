import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/AuthSlice";
// import usersReducer from "../features/UsersSlice";
// import restrosReducer from "../features/RestrosSlice";
// import paymentReducer from "../features/PaymentSlice";
// import staffReducer from "../features/StaffSlice";
// import subscriptionsReducer from "../features/SubscriptionSlice";

const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const { token } = store.getState().auth;

  localStorage.setItem("token", token);
 
  return result;
};


export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware),
});
