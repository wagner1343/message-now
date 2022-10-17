import * as express from "express";
import {NextFunction} from "express-serve-static-core";
import firebaseAdmin from "firebase-admin";

export const authenticateFirebaseUser = (firebaseAuth: firebaseAdmin.auth.Auth) => async (req: express.Request, res: express.Response, next: NextFunction) => {
    const idToken = getTokenFromHeader(req) ?? getTokenFromCookies(req);

    if(!idToken) {
        return res.status(403).send("Unauthorized");
    }

    try {
        res.locals.idToken = await firebaseAuth.verifyIdToken(idToken);
        next();
        return;
    } catch (error) {
        console.error("Erro decodificando ID token do firebase:", error);
        res.status(403).send("Unauthorized");
        return;
    }
}


const getTokenFromHeader = (req: express.Request) => {
    const authHeader = req.headers.authorization;
    if(authHeader?.startsWith("Bearer ")) {
        return authHeader.split("Bearer ")[1]
    }
}
const getTokenFromCookies = (req: express.Request) => {
    return req.cookies.__session;
}