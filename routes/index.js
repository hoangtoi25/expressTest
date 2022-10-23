var express = require("express");
var router = express.Router();
const fs = require("fs");
var path = require("path");

router.get("/", function (req, res, next) {
  let totalCalls = 0;
  let totalCost = 0;

  //read data from json file
  let rawdata = fs.readFileSync(path.join(__dirname + "/../data/callLog.json"));
  let callLogs = JSON.parse(rawdata);
  var keys = Object.keys(callLogs);
  totalCalls = keys.length;

  //caculate cost
  for (var i = 0; i < totalCalls; i++) {
    let log = callLogs[keys[i]];
    const fromPhone = log.FromPhone;
    const toNumber = log.ToNumber;
    const direction = log.Direction;
    const duration = durationToSecond(log.Duration);
    let cost = 0;

    let typeFromPhone = getTypePhoneNumber(fromPhone);
    let typeToPhone = getTypePhoneNumber(toNumber);
    if (typeToPhone === NumberTypes.LocalPhoneNumber) {
      // * For **inbound** or **outbound** call to a local phone number, the cost is `1 cent` for each second.
      cost = duration * 1;
    } else if (
      direction === "inbound" &&
      typeToPhone === NumberTypes.TollFreeNumber
    ) {
      //* For inbound call to a toll-free number, the cost is `3 cents` for each second.
      cost = duration * 3;
    } else if (
      direction === "outbound" &&
      typeToPhone === NumberTypes.TollFreeNumber
    ) {
      // * For outbound call to a toll-free number, the cost is `2 cents` for each second.
      cost = duration * 2;
    }
    totalCost += cost;
  }

  res.json({
    totalCalls: totalCalls,
    totalCost: totalCost,
  });
});

const NumberTypes = {
  TollFreeNumber: 0,
  LocalPhoneNumber: 1,
};

//get second from time duratin
function durationToSecond(duration) {
  const words = duration.split(":");
  if (words.length === 3) {
    var second =
      parseInt(words[0]) * 3600 + parseInt(words[1]) * 60 + parseInt(words[2]);
  }
  return second;
}

//check prefix --> Type of Phone
function getTypePhoneNumber(number) {
  let prefix = "";
  //if phone have () --> prefix = value between ()
  if (number.includes("(") && number.includes(")")) {
    prefix = number.split("(")[1].split(")")[0]; //ex: (453) 915-6459
  } else {
    //count character '-' and '.' to find prefix phone
    let countSnake = (number.match(/-/g) || []).length;
    let countDot = (number.match(/\./g) || []).length;
    if (countSnake === 3) {
      //ex: +1-467-216-7034
      prefix = number.split("-")[1];
    } else if (countSnake === 2) {
      //ex: 570-957-1726
      prefix = number.split("-")[0];
    } else if (countDot === 2) {
      //ex: 492.491.3864
      prefix = number.split(".")[0];
    }
  }

  // prefix 800, 833, 866, 888 is TollFreeNumber
  switch (prefix) {
    case "800":
      return 0;
    case "833":
      return 0;
    case "866":
      return 0;
    case "888":
      return 0;
  }

  return 1;
}

module.exports = router;
