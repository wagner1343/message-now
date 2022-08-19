import * as functions from "firebase-functions";
import {auth} from "firebase-admin/lib/auth";
import DecodedIdToken = auth.DecodedIdToken;

export type AuthenticatedRequest = functions.https.Request & {idToken: DecodedIdToken}
