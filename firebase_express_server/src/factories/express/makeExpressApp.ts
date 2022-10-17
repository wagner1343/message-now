import express from "express";

const instance = express();

export const makeExpressApp = () => instance;