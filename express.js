import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

const app = express();
const port = 3000;

app.use(cors());

const jwtCheck = auth({
  audience: "https://localhost:3000",
  issuerBaseURL: "https://dev-r8rabwrw14hnnk3j.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("Unauthorized");
  return jwtCheck(req, res, next);
};

app.get("/api/category-search", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing Search Parameter" });
  }

  try {
    const apiUrl = `${url}`;

    const response = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from API:", error);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
