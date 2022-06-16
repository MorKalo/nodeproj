const supertest = require("supertest")
const should = require("should");
const { assert } = require("chai");
const axios = require('axios').default;

const server = supertest.agent("localhost:8081")
