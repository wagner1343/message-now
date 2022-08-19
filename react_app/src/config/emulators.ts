export default {
  useFirestoreEmulator: process.env.REACT_APP_USE_FIRESTORE_EMULATOR === "true",
  firestoreHost: process.env.REACT_APP_EMULATOR_FIRESTORE_HOST ?? "localhost",
  firestorePort: parseInt(process.env.REACT_APP_EMULATOR_FIRESTORE_PORT ?? "8080", 10),
  
  useFunctionsEmulator: process.env.REACT_APP_USE_FUNCTIONS_EMULATOR === "true",
  functionsHost: process.env.REACT_APP_EMULATOR_FUNCTIONS_HOST ?? "localhost",
  functionsPort: parseInt(process.env.EMULATOR_FUNCTIONS_PORT ?? "5001", 10),
  
  useAuthEmulator: process.env.REACT_APP_USE_AUTH_EMULATOR === "true",
  authUrl: process.env.REACT_APP_EMULATOR_AUTH_URL ?? "http://localhost:9099"
};
