import express from "express";
var router = express.Router();

import {
  AllAWC,
  addAWC,
  AddChildren,
  ReadChidren,
  searchChildren,
  EditChildren,
  ReadSingleChildren,
  DeleteChild,
  AddPregnantLadies,
  ReadPregnantLadies,
  searchLady,
  ReadSinglePregnantLadie,
  EditPregnantLady,
  DeletePregnantLady,
  attendanceEntry,
  ReadAttendanceEntry,
  addStockDetails,
  ReadStockDetails,
  AddStudyMaterial,
  ReadStudyMaterials,
} from "../controller/AnganwadiCenters.js";

router.get("/all-awc/:divisionCode", AllAWC);

router.post("/add-awc", addAWC);

router.post("/add-child", AddChildren);
router.get("/view-children/:centerCode", ReadChidren);
router.post("/search-children", searchChildren);
router.put("/edit-child", EditChildren);
router.get("/get-child/:centerCode/:id", ReadSingleChildren);
router.delete("/delete-child", DeleteChild);

router.post("/add-plady", AddPregnantLadies);
router.get("/view-pladies/:centerCode", ReadPregnantLadies);
router.post("/search-pladies", searchLady);
router.put("/edit-plady", EditPregnantLady);
router.get("/get-plady/:centerCode/:id", ReadSinglePregnantLadie);
router.delete("/delete-plady", DeletePregnantLady);

router.post("/attendanceEntry", attendanceEntry);
router.get("/view-attendance/:centerCode", ReadAttendanceEntry);

router.post("/addStockDetails", addStockDetails);
router.get("/view-stocks/:centerCode", ReadStockDetails);

router.post("/addStudyMaterials", AddStudyMaterial);
router.get("/view-studymaterials/:centerCode", ReadStudyMaterials);

export default router;
