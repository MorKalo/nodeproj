const express = require('express')
const { logger } = require("./logger");
const rep_repo = require('./reports-repo')
const path = require('path')

logger.debug("====== System startup ========");


const port = 8080

const app = express()

// to server static pages
app.use(express.static(path.join(".", " /static")))

// for POST json 
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//get all is checked
app.get('/reports', async(req, res) => {
    const reports = await rep_repo.getAllReports(); 
    res.status(200).json({ reports })
});


//get by id is checked
app.get('/reports/:rep_id', async(req, res) => {
  const rep_id = req.params.rep_id;
  const reports = await rep_repo.getReportsById(rep_id); 
  res.status(200).json({ reports })
});


//post checked
app.post('/reports', async (req, res) => {
  try
  {
      rep = req.body
      const result = await rep_repo.addReport(rep)
      res.status(201).json({
          res: 'success',
          url: `localhost:8080/reports/${rep.ID}`,
          result
      })
  }
  catch(e) {
      res.status(400).send({
          status: 'fail',
          message: e.message
      })
  }
})


//put checked
app.put("/reports/:rep_id", async (req, res) => {
  const rep_id = req.params.rep_id;
  try {
    report = req.body;
    const result = await rep_repo.updateReport(report, rep_id);
    res.status(200).json({
      res: "success",
      url: `/reports/${report.ID}`,
      result,
    });
  } catch (e) {
    logger.error(`failed to update report. Error: ${e}`);
    res.status(400).send({
      status: "error",
      message: e.message,
    });
  }
});

//delete is checked
app.delete('/reports/:rep_id', async(req, res) => {
  const rep_id = req.params.rep_id
  try{
      const result = await rep_repo.deleteReport(rep_id);
      res.status(200).json({result });
      } catch (e) {
        logger.error(`failed to delete report. Error: ${e}`);
        res.status(400).send({
          status: "error",
          message: e.message,
        });
      }
    });

app.listen(port, () => console.log(`Listening to port ${port}`));