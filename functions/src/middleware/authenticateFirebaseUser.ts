import * as functions from "firebase-functions";
import * as express from "express";
import {NextFunction} from "express-serve-static-core";
import {firebaseAuth} from "./../firebase";
import {auth} from "firebase-admin/lib/auth";
import DecodedIdToken = auth.DecodedIdToken;

export default async function authenticateFirebaseUser(req: express.Request & { idToken?: DecodedIdToken }, res: express.Response, next: NextFunction) {
  functions.logger.log("Verificando se a requisicão está autorizada utilizando ID token do firebase");

  if ((!req.headers.authorization?.startsWith("Bearer ")) &&
        !(req.cookies?.__session)) {
    functions.logger.error(
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
    functions.logger.log("Header \"Authorization\" encontrado");
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    functions.logger.log("Cookie \"__session\" encontrado");
    idToken = req.cookies.__session;
  } else {
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    const decodedIdToken = await firebaseAuth.verifyIdToken(idToken);
    functions.logger.log("ID Token decodificada corretamente", decodedIdToken);
    req.idToken = decodedIdToken;
    next();
    return;
  } catch (error) {
    functions.logger.error("Erro decodificando ID token do firebase:", error);
    res.status(403).send("Unauthorized");
    return;
  }
}
