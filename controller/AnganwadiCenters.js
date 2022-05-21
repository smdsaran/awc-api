import AnganwadiCenters from "../model/AnganwadiCenters.js";
import sendSMS from "../methods/TwilioSMS.js";
import sendFastTwoFastSMS from "../methods/FastTwoSms.js";
import BMI from "../methods/BMI.js";

//////////////////////////////////  Add AWC //////////////////////////////////

export const addAWC = async (req, res) => {
  const {
    centerCode,
    divisionCode,
    pincode,
    latitude,
    longitude,
    streetOrArea,
    cityOrVillage,
    district,
    state,
  } = req.body;

  const found = await AnganwadiCenters.findOne({ centerCode: centerCode });

  if (!found) {
    const data = new AnganwadiCenters({
      centerCode,
      divisionCode,
      pincode,
      latitude,
      longitude,
      streetOrArea,
      cityOrVillage,
      district,
      state,
    });

    const result = await data.save();

    if (result) res.send("AWC Added.");
    else res.send("Something Wrong");
  } else {
    const update = await AnganwadiCenters.updateOne(
      { centerCode: centerCode },
      {
        centerCode,
        divisionCode,
        pincode,
        latitude,
        longitude,
        streetOrArea,
        cityOrVillage,
        district,
        state,
      }
    );

    if (update) res.send("AWC Updated.");
    else res.send("Something Wrong");
  }
};
////////////////////////////////   All AWC for Supervisor ////////////////////

export const AllAWC = async (req, res) => {
  const { divisionCode } = req.params;

  const results = await AnganwadiCenters.find({
    divisionCode: divisionCode,
  }).select("centerCode cityOrVillage pincode district state");

  if (!results) res.send("No AWC.");
  else res.send(results);
};

////////////////////////////////   Read Single AWC   /////////////////////////
export const readAWC = async (req, res) => {
  const { centerCode } = req.params;

  const results = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select("streetOrArea cityOrVillage pincode district state");

  if (!results) res.send("No AWC.");
  else res.send(results);
};

////////////////////////////////    Add Children ///////////////////////////////

export const AddChildren = async (req, res) => {
  const {
    centerCode,
    name,
    age,
    dob,
    fatherName,
    motherName,
    mobile_no,
    address,
    height,
    weight,
  } = req.body;

  console.log(req.body);

  let bmi = BMI(weight, height);
  // const file = req.file;
  console.log(bmi);

  // let photo = file.originalname;

  const child = {
    name,
    age,
    dob,
    fatherName,
    motherName,
    mobile_no,
    address,
    height,
    weight,
    bmi,
    // photo,
  };

  const result = await AnganwadiCenters.findOne({ centerCode: centerCode });

  // console.log(result);

  if (result) {
    result.children.push(child);
    const ret = await result.save();
    console.log(ret);
    ret ? res.send("Child Added.") : res.send("Something Wrong");
  } else {
    res.send("No AWC Available.");
  }
};

////////////////////////////////   Read Children /////////////////////////////////

export const ReadChidren = async (req, res) => {
  const { centerCode } = req.params;

  const result = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select("children");

  result ? res.send(result) : res.send("Something Wrong");
};

//////////////////////////////    Read Single Child   /////////////////////////

export const ReadSingleChildren = async (req, res) => {
  const { centerCode, id } = req.params;

  console.log(req.params);

  const result = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select({ children: { $elemMatch: { _id: id } } });

  const obj = result.children[0];

  console.log(result);

  if (result) res.send(obj);
  else res.send("No Data Available.");
};

///////////////////////////////// Search Children //////////////////////////////

export const searchChildren = async (req, res) => {
  const { search, centerCode } = req.body;

  const obj = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select("children");

  let result = [];

  for (let i = 0; i < obj.children.length; i++) {
    let regEx = new RegExp(`\\b${search}\\b`, "gi");
    let name = obj.children[i].name;
    if (name.match(regEx)) {
      result.push(obj.children[i]);
    }
  }

  console.log(result);

  res.send(result);
};

////////////////////////////////    Updae Children ///////////////////////////////

export const EditChildren = async (req, res) => {
  const {
    centerCode,
    name,
    age,
    dob,
    fatherName,
    motherName,
    mobile_no,
    address,
    height,
    weight,
    id,
  } = req.body;

  console.log(req.body);

  let bmi = BMI(weight, height);

  console.log(bmi);

  // const id = mongoose.Types.ObjectId(req.body.id);

  const query = {
    centerCode: centerCode,
    "children._id": id,
  };

  const result = await AnganwadiCenters.updateOne(query, {
    $set: {
      "children.$.name": name,
      "children.$.age": age,
      "children.$.dob": dob,
      "children.$.fatherName": fatherName,
      "children.$.motherName": motherName,
      "children.$.mobile_no": mobile_no,
      "children.$.address": address,
      "children.$.height": height,
      "children.$.weight": weight,
      "children.$.bmi": bmi,
    },
  })
    .then(() => res.send("Updated Sucessfully."))
    .catch((err) => console.log(err));

  // if (result) res.send("Updated Sucessfully.");
  // else res.send("Something Wrong");
};

/////////////////////////////////////  Delete CChild /////////////////////////////

export const DeleteChild = async (req, res) => {
  // const id = mongoose.Types.ObjectId(req.body.id);
  const id = req.body.id;
  const { centerCode } = req.body;

  console.log(req.body);

  const result = await AnganwadiCenters.findOneAndUpdate(
    { centerCode: centerCode },
    {
      $pull: {
        children: { _id: id },
      },
    },
    { safe: true, multi: false }
  );

  result ? res.send("Deleted Sucessfully.") : res.send("Something Wrong");
};

//////////////////////////////////////  Add Pregnant Ladies //////////////////////////////

export const AddPregnantLadies = async (req, res) => {
  const {
    centerCode,
    name,
    age,
    dob,
    husbandName,
    deliveredDate,
    pregnancyMonth,
    mobile_no,
    address,
    height,
    weight,
  } = req.body;

  console.log(req.body);
  // const file = req.file;
  // console.log(file);

  // let photo = file.originalname;

  let created_at = new Date().toLocaleString();

  const p_lady = {
    name,
    age,
    dob,
    husbandName,
    deliveredDate,
    pregnancyMonth,
    mobile_no,
    address,
    height,
    weight,
    created_at,
    // photo,
  };

  const result = await AnganwadiCenters.findOne({ centerCode: centerCode });

  if (result) {
    result.pregnantLadies.push(p_lady);
    const ret = await result.save();
    console.log(ret);
    ret ? res.send("Lady Added.") : res.send("Something Wrong");
  } else {
    res.send("No AWC Available.");
  }
};

////////////////////////////////   Read PLady /////////////////////////////////

export const ReadPregnantLadies = async (req, res) => {
  const { centerCode } = req.params;

  console.log(req.params);

  const result = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  })
    .select("pregnantLadies")
    .sort({ _id: -1 });

  result ? res.send(result) : res.send("Something Wrong");
};

//////////////////////////////    Read Single Lady  /////////////////////////

export const ReadSinglePregnantLadie = async (req, res) => {
  const { centerCode, id } = req.params;

  console.log(req.params);

  const result = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select({ pregnantLadies: { $elemMatch: { _id: id } } });

  const obj = result.pregnantLadies[0];

  console.log(result);

  if (result) res.send(obj);
  else res.send("No Data Available.");
};

///////////////////////////////// Search Lady //////////////////////////////

export const searchLady = async (req, res) => {
  const { search, centerCode } = req.body;

  console.log(req.body);

  const ladies = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select("pregnantLadies");

  console.log(ladies);

  let result = [];

  for (let i = 0; i < ladies.pregnantLadies.length; i++) {
    let regEx = new RegExp(`\\b${search}\\b`, "gi");
    let name = ladies.pregnantLadies[i].name;
    if (name.match(regEx)) {
      result.push(ladies.pregnantLadies[i]);
    }
  }

  console.log(result);

  res.send(result);
};

////////////////////////////////    Updae Pregnant Lady ///////////////////////////////

export const EditPregnantLady = async (req, res) => {
  const {
    centerCode,
    name,
    age,
    dob,
    husbandName,
    deliveredDate,
    pregnancyMonth,
    mobile_no,
    address,
    height,
    weight,
    id,
  } = req.body;

  // const id = mongoose.Types.ObjectId(req.body.id);
  let created_at = new Date().toLocaleString();

  const query = {
    centerCode: centerCode,
    "pregnantLadies._id": id,
  };

  const result = await AnganwadiCenters.updateOne(query, {
    $set: {
      "pregnantLadies.$.name": name,
      "pregnantLadies.$.age": age,
      "pregnantLadies.$.dob": dob,
      "pregnantLadies.$.husbandName": husbandName,
      "pregnantLadies.$.deliveredDate": deliveredDate,
      "pregnantLadies.$.pregnancyMonth": pregnancyMonth,
      "pregnantLadies.$.mobile_no": mobile_no,
      "pregnantLadies.$.address": address,
      "pregnantLadies.$.height": height,
      "pregnantLadies.$.weight": weight,
      "pregnantLadies.$.created_at": created_at,
    },
  });

  result ? res.send("Updated Sucessfully.") : res.send("Something Wrong");
};

// /////////////////////////////////////  Delete Pregnant Lady /////////////////////////////

export const DeletePregnantLady = async (req, res) => {
  const id = req.body.id;
  const { centerCode } = req.body;

  const result = await AnganwadiCenters.findOneAndUpdate(
    { centerCode: centerCode },
    {
      $pull: {
        pregnantLadies: { _id: id },
      },
    },
    { safe: true, multi: false }
  );

  result ? res.send("Deleted Sucessfully.") : res.send("Something Wrong");
};

///////////////////////////////////////////  Add Attendance Entry /////////////////////////////////

export const attendanceEntry = async (req, res) => {
  const { attendance, centerCode } = req.body; //it should be array with name and present

  console.log(attendance);

  // const today = new Date().toLocaleDateString();

  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");

  const data = {
    date: formattedDate,
    attendance: attendance,
  };

  const result = await AnganwadiCenters.findOne({ centerCode: centerCode });

  if (result) {
    result.attendanceEntry.push(data);
    const ret = await result.save();
    res.send("Attendance Recorded.");
  } else {
    res.send("No AWC Available.");
  }
};

////////////////////////////////////  Read Attendance Entry ///////////////////////////

export const ReadAttendanceEntry = async (req, res) => {
  const { centerCode, days } = req.params;

  console.log(days);

  let limit;

  if (days === "today") limit = 1;
  else if (days === "Last Week") limit = 7;
  else if (days === "Last Month") limit = 31;
  else if (days === "Last 3 Months") limit = 90;
  else limit = 365;

  const result = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select("attendanceEntry latitude longitude");
  // .sort({ _id: -1 });
  // .limit(limit);

  // console.log(result);

  let ans = result.attendanceEntry.reverse();
  let filteredData = ans.slice(0, limit);

  let data = {
    attendance: filteredData,
    latitude: result.latitude,
    longitude: result.longitude,
  };

  result ? res.send(data) : res.send("Something Wrong");
};

//////////////////////////////////// Add Stock Details ////////////////////////////////

export const addStockDetails = async (req, res) => {
  const {
    centerCode,
    oilInLitre,
    pulseInKg,
    nutritionFlourInPacket,
    eggInNum,
    riceInKg,
  } = req.body;

  // const deliveryDate = new Date().toLocaleDateString();

  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");

  const billImage = req.file.originalname;

  const data = {
    deliveryDate: formattedDate,

    delivered: {
      oilInLitre,
      pulseInKg,
      nutritionFlourInPacket,
      eggInNum,
      riceInKg,
      billImage,
    },

    existing: {
      oilInLitre,
      pulseInKg,
      nutritionFlourInPacket,
      eggInNum,
      riceInKg,
    },
  };

  const result = await AnganwadiCenters.findOne({ centerCode: centerCode });

  if (result) {
    result.stocksInfo.push(data);
    const ret = await result.save();
    res.send("Stock Details Added.");

    if (ret) {
      result.pregnantLadies.forEach((lady) => {
        sendSMS(
          "Nutrition Supplements Arrived to Anganwadi Center. Come and Get Your Shares.",
          `+91${lady.mobile_no}`
        );

        sendFastTwoFastSMS(
          "Nutrition Supplements Arrived to Anganwadi Center. Come and Get Your Shares.",
          lady.mobile_no
        );
      });
    }
  } else {
    res.send("No AWC Available.");
  }

  // const p_ladies = await AnganwadiCenters.find({ centerCode: centerCode }).select("pregnantLadies");
};

//////////////////////////////////////  Update Existing Stocks /////////////////////////////////////

export const existingStockDetails = async (req, res) => {
  const {
    centerCode,
    oilInLitre,
    pulseInKg,
    nutritionFlourInPacket,
    eggInNum,
    riceInKg,
  } = req.body;

  const ret = await AnganwadiCenters.findOne({ centerCode: centerCode }).select(
    "stocksInfo"
  );

  console.log(ret);

  let len = ret.stocksInfo.length;

  let id = ret.stocksInfo[len - 1]._id;

  const query = {
    centerCode: centerCode,
    "stocksInfo._id": id,
  };

  const result = await AnganwadiCenters.updateOne(query, {
    $set: {
      "stocksInfo.$.existing.oilInLitre": oilInLitre,
      "stocksInfo.$.existing.pulseInKg": pulseInKg,
      "stocksInfo.$.existing.nutritionFlourInPacket": nutritionFlourInPacket,
      "stocksInfo.$.existing.eggInNum": eggInNum,
      "stocksInfo.$.existing.riceInKg": riceInKg,
    },
  });

  result ? res.send("Updated Sucessfully.") : res.send("Something Wrong");
};
/////////////////////////////////////   Read Stock Details  ////////////////////////////////////////////////

export const ReadStockDetails = async (req, res) => {
  const { centerCode } = req.params;

  console.log(centerCode);

  const result = await AnganwadiCenters.findOne({
    centerCode: centerCode,
  }).select("stocksInfo");

  console.log(result);

  let len = result.stocksInfo.length;

  result ? res.send(result.stocksInfo[len - 1]) : res.send("Something Wrong");
};

//////////////////////////////////////////////////    Add Study Material ///////////////////////////////////////////

export const AddStudyMaterial = async (req, res) => {
  const { centerCode, link, title } = req.body;

  let splitedLink = link.split("be/");

  const data = {
    link: splitedLink[1],
    title,
  };

  const result = await AnganwadiCenters.findOne({ centerCode: centerCode });

  if (result) {
    result.studyMaterials.push(data);
    const ret = await result.save();
    res.send("Added.");
  } else {
    res.send("No AWC Available.");
  }
};

/////////////////////////////////////   Read Study Materials  ////////////////////////////////////////////////

export const ReadStudyMaterials = async (req, res) => {
  const { centerCode } = req.params;

  const result = await AnganwadiCenters.find({ centerCode: centerCode }).select(
    "studyMaterials"
  );

  console.log(result[0].studyMaterials);

  result ? res.send(result[0].studyMaterials) : res.send("Something Wrong");
};
