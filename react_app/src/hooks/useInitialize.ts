import {useSelector} from "src/store";

export default function useInitialize() {
  const isInitializing = {
    firebase: useSelector((state) => state.firebase.isInitializing),
    auth: !useSelector((state) => state.firebase.auth.isLoaded),
  };
  
  return {
    isInitializing: Object.values(isInitializing).some(v => v),
    ...isInitializing
  };
}