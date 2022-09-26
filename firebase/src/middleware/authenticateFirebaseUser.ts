import * as express from "express";
import {NextFunction} from "express-serve-static-core";
import firebaseAdmin from "firebase-admin";

export const authenticateFirebaseUser = (firebaseAuth: firebaseAdmin.auth.Auth) => async (req: express.Request, res: express.Response, next: NextFunction) => {
  console.log("Verificando se a requisicão está autorizada utilizando ID token do firebase");
  console.log("headers ", req.headers);
  if ((!req.headers.authorization?.startsWith("Bearer ")) &&
        !(req.cookies?.__session)) {
    console.error(
        "ID token do firebase não encontrada no header Authorization",
        "Autorize a chamada passando o ID token do firease nos header da requisição da seguinte forma: ",
        "Authorization: Bearer <Firebase ID Token>",
        "ou passando um cookie \"__session\"."
    );
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    console.log("Header \"Authorization\" encontrado");
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    console.log("Cookie \"__session\" encontrado");
    idToken = req.cookies.__session;
  } else {
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedIdToken = await firebaseAuth.verifyIdToken(idToken);
    console.log("ID Token decodificada corretamente", decodedIdToken);
    res.locals.idToken = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error("Erro decodificando ID token do firebase:", error);
    res.status(403).send("Unauthorized");
    return;
  }
}
