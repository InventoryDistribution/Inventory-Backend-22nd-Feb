const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("express/lib/response");
const request = require("request").defaults({ rejectUnauthorized: false });
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 9004;
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, "0.0.0.0", () => {
  console.log(`server started on port 9004`);
});
app.post("/api/ProductionOrderFilters", (req, res) => {
  console.log("ProductionOrderFilters Client Data", req.body);
  let fromDateOne = req.body.fromDateOne5;
  let toDateTwo = req.body.toDateTwo6;
  let status = req.body.status;
  let warehouse = req.body.whsid;
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (fromDateOne === "") {
    fromDateOne = 0;
  }
  if (toDateTwo === "") {
    toDateTwo = 0;
  }
  if (status === "" || "Planned" || "Received") {
    status = "string";
  }
  if (warehouse === "") {
    warehouse = "string";
  }
  if (series === "") {
    series = 0;
  }
  if (docNum === "") {
    docNum = 0;
  }
  // console.log("from date", fromDateOne);
  // console.log("to date", toDateTwo);
  // console.log("status", status);
  // console.log("warehouse", warehouse);
  // console.log("series", series);
  // console.log("docNum", docNum);
  request.post(
    "http://123.108.45.21:9090/api/ProductionOrderFilters",
    {
      json: {
        fromDate: "2022-02-15",
        toDate: "2022-02-16",
        status: "string",
        warehouse: "string",
        series: 0,
        docNum: 0,
        // fromDate: fromDateOne,
        // toDate: toDateTwo,
        // status: status,
        // warehouse: warehouse,
        // series: series,
        // docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      console.log("Production Order Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/ITRDrafts", (req, res) => {
  console.log("ITR Drafts Client Data", req.body);
  const cardCode = req.body.cardCode;
  const refDocEntry = req.body.docEntry;
  const refObjType = req.body.objectType;
  const docDate = req.body.docDate5;
  const dueDate = req.body.dueDate6;
  const comments = req.body.comments1;
  const toWarehouse = req.body.whsid1;
  //Polines data
  const id = req.body.id;
  const docEntry = req.body.docEntry;
  const lineNum = req.body.lineNum;
  // console.log("cardCode", cardCode);
  // console.log("refDocEntry", refDocEntry);
  // console.log("refObjType", refObjType);
  request.post(
    "http://192.168.1.102:8082/api/ITRDrafts",
    {
      json: {
        // "cardCode": cardCode,
        // "refDocEntry": refDocEntry,
        // "refObjType": refObjType,
        // "docDate": docDate,
        // "dueDate": dueDate,
        // "toWarehouse": toWarehouse,
        // "comments": comments,
        // poLines: [
        //   {
        //     id: 4,
        //     docEntry: 7,
        //     lineNum: 4,
        //   },
        //   {
        //     id: 3,
        //     docEntry: 7,
        //     lineNum: 3,
        //   },
        //   {
        //     id: 7,
        //     docEntry: 7,
        //     lineNum: 7,
        //   },
        // ],
        cardCode: "CD00029",
        toWarehouse: "01",
        comments: "01 - Feb comment",
        docDate: "2023-02-01",
        dueDate: "2023-02-03",
        refDocEntry: 7,
        refObjType: "ProductionOrder",
        poLines: [
          {
            id: 4,
            docEntry: 7,
            lineNum: 4,
          },
          {
            id: 3,
            docEntry: 7,
            lineNum: 3,
          },
          {
            id: 7,
            docEntry: 7,
            lineNum: 7,
          },
        ],
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      console.log("ITR ADD api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getPRDSeries", (req, res) => {
  request.get(
    "http://123.108.45.21:9090/api/Seriess/GetSeriesByObject/202",
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      console.log("Series api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getWarehouse", (req, res) => {
  request.get(
    "http://123.108.45.21:9090/api/Warehouses/N",
    {
      json: {},
    },
    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      console.log("Warehouse api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getGRNSeries", (req, res) => {
  request.get(
    "http://123.108.45.21:9090/api/Seriess/GetSeriesByObject/59",
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      console.log("Series api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.get("/api/getGRNVendorAPI", (req, res) => {
  request.get(
    "http://123.108.45.21:9090/api/BusinessPartners/GetBusinessPartnerByType/S",
    {
      json: {},
    },
    function (error, response, body) {
      if (error) {
        return res.send("Failed to Load Data." + error);
      }
      console.log("Vendor api Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
app.post("/api/GRNOrderFilters", (req, res) => {
  console.log("GRNOrderFilters Client Data", req.body);
  let fromDateOne = req.body.fromDateOne5;
  let toDateTwo = req.body.toDateTwo6;
  let cardCode = req.body.vendorid;
  let series = req.body.seriesid;
  let docNum = req.body.docNum;
  if (fromDateOne === "") {
    fromDateOne = 0;
  }
  if (toDateTwo === "") {
    toDateTwo = 0;
  }
  if (cardCode === "") {
    cardCode = "string";
  }
  if (series === "") {
    series = 0;
  }
  if (docNum === "") {
    docNum = 0;
  }
  console.log("from date", fromDateOne);
  console.log("to date", toDateTwo);
  console.log("cardCode", cardCode);
  console.log("series", series);
  console.log("docNum", docNum);
  request.post(
    "http://123.108.45.21:9090/api/GRNs",
    {
      json: {
        fromDate: "2022-02-15",
        toDate: "2022-02-16",
        cardCode: "string",
        series: 0,
        docNum: 0,
        // fromDate: fromDateOne,
        // toDate: toDateTwo,
        // cardCode: cardCode,
        // series: series,
        // docNum: docNum,
      },
    },

    function (error, response, body) {
      if (error) return res.send("Failed to Load Data." + error);
      console.log("GRN Order Success");
      //console.log("Response", response);
      res.send(response);
    }
  );
});
