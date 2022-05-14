import mongoose from "mongoose";

const anganwadiCentersSchema = new mongoose.Schema({
  centerCode: {
    type: String,
    required: true,
  },

  divisionCode: {
    type: String,
    required: true,
  },

  pincode: {
    type: String,
    required: true,
  },

  streetOrArea: {
    type: String,
    required: true,
  },

  cityOrVillage: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  // images: [
  //   {
  //     imageName: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  children: [
    {
      name: {
        type: String,
        required: true,
      },

      age: {
        type: String,
        required: true,
      },

      dob: {
        type: String,
        required: true,
      },

      fatherName: {
        type: String,
        required: true,
      },

      motherName: {
        type: String,
        required: true,
      },

      mobile_no: {
        type: String,
        required: true,
        // validate: {
        //   validator: function (v) {
        //     return /d{10}/.test(v);
        //   },
        //   message: "{VALUE} is not a valid 10 digit number!",
        // },
      },

      address: {
        type: String,
        required: true,
      },

      height: {
        type: String,
        required: true,
      },

      weight: {
        type: String,
        required: true,
      },

      // photo: {
      //   type: String,
      //   required: true,
      // },
    },
  ],

  pregnantLadies: [
    {
      name: {
        type: String,
        required: true,
      },

      age: {
        type: String,
        required: true,
      },

      dob: {
        type: String,
        required: true,
      },

      husbandName: {
        type: String,
        required: true,
      },

      deliveredDate: {
        type: String,
        required: true,
      },

      pregnancyMonth: {
        type: String,
        required: true,
      },

      mobile_no: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      height: {
        type: String,
        required: true,
      },

      weight: {
        type: String,
        required: true,
      },

      // photo: {
      //   type: String,
      //   required: true,
      // },
      created_at: {
        type: String,
      },
    },
  ],

  attendanceEntry: [
    {
      date: {
        type: String,
        required: true,
      },

      attendance: [
        {
          name: {
            type: String,
            required: true,
          },

          present: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],

  stocksInfo: [
    {
      deliveryDate: {
        type: String,
      },

      delivered: {
        type: {
          type: String,
        },

        oilInLitre: {
          type: String,
        },

        pulseInKg: {
          type: String,
        },

        nutritionFlourInPacket: {
          type: String,
        },

        eggInNum: {
          type: String,
        },

        riceInKg: {
          type: String,
        },

        billImage: {
          type: String,
        },
      },

      existing: {
        type: {
          type: String,
        },

        oilInLitre: {
          type: String,
        },

        pulseInKg: {
          type: String,
        },

        nutritionFlourInPacket: {
          type: String,
        },

        eggInNum: {
          type: String,
        },

        riceInKg: {
          type: String,
        },
      },
    },
  ],

  studyMaterials: [
    {
      link: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },
    },
  ],
});

const AnganwadiCenters = new mongoose.model(
  "AnganwadiCenter",
  anganwadiCentersSchema
);

export default AnganwadiCenters;
