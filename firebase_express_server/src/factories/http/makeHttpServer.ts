import http from "http";
import {makeExpressApp} from "../express/makeExpressApp";

const instance = http.createServer(makeExpressApp());
export const makeHttpServer = () => instance;