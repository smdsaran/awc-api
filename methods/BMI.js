const BMI = (weight, height) => {
  let bmi = (weight / ((height * height) / 10000)).toFixed(2);

  // Dividing as per the bmi conditions

  if (bmi < 15) return "Starvation";
  else if (bmi >= 15.1 && bmi < 17.5) return "Anorexic";
  else if (bmi >= 17.6 && bmi < 18.5) return `Under Weight`;
  else if (bmi >= 18.6 && bmi < 24.9) return "Normal Weight";
  else if (bmi >= 25 && bmi < 30) return "Over Weight";
  else if (bmi >= 30 && bmi < 40) return "Obese";
  else return "Morbidly Obese";
};

export default BMI;
