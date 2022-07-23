const unitName = {
  ton: "Tonne",
  kilo: "Kilogram",
  gram: "Gram",
  milli: "Milligram",
  micro: "Microgram",
  impton: "Imperial Ton",
  uston: "US Ton",
  stone: "Stone",
  pound: "Pound",
  ounce: "Ounce",
};

const unitToKg = {
  ton: 1000000000000000,
  kilo: 1000000000000,
  gram: 1000000000,
  milli: 1000000,
  micro: 1000,
  impton: 1016046908800000,
  uston: 907184740000000,
  stone: 6350293180000,
  pound: 453592370000,
  ounce: 28349523125,
};

const units = Object.keys(unitToKg);

const defaultUnit = {
  from: units[1],
  to: units[2],
};

const main = () => {
  const selectedUnit = defaultUnit;

  const unitElement = {
    from: document.getElementById("fromUnit"),
    to: document.getElementById("toUnit"),
  };

  const weightElement = {
    from: document.getElementById("from"),
    to: document.getElementById("to"),
  };

  const alter = document.getElementById("alter");

  const convert = {
    from: () => {
      if (!weightElement.from.value)
        return (weightElement.to.value = weightElement.from.value);

      weightElement.to.value =
        (weightElement.from.value * unitToKg[unitElement.from.value]) /
        unitToKg[unitElement.to.value];
    },
    to: () => {
      if (!weightElement.to.value)
        return (weightElement.from.value = weightElement.to.value);

      weightElement.from.value =
        (weightElement.to.value * unitToKg[unitElement.to.value]) /
        unitToKg[unitElement.from.value];
    },
  };

  units.forEach((unit) => {
    const fromOption = document.createElement("option");
    const toOption = document.createElement("option");

    fromOption.value = toOption.value = unit;
    fromOption.text = toOption.text = unitName[unit];

    unitElement.from.appendChild(fromOption);
    unitElement.to.appendChild(toOption);
  });

  unitElement.from.value = selectedUnit.from;
  unitElement.to.value = selectedUnit.to;

  unitElement.from.addEventListener("change", (e) => {
    if (e.target.value === selectedUnit.to)
      unitElement.to.value = selectedUnit.to = selectedUnit.from;

    selectedUnit.from = e.target.value;
    convert.from();
  });

  unitElement.to.addEventListener("change", (e) => {
    if (e.target.value === selectedUnit.from)
      unitElement.from.value = selectedUnit.from = selectedUnit.to;

    selectedUnit.to = e.target.value;
    convert.from();
  });

  weightElement.from.addEventListener("keydown", convert.from);
  weightElement.from.addEventListener("change", convert.from);

  weightElement.to.addEventListener("keydown", convert.to);
  weightElement.to.addEventListener("change", convert.to);

  alter.addEventListener("click", () => {
    unitElement.from.value = selectedUnit.to;
    unitElement.to.value = selectedUnit.from;

    selectedUnit.from = unitElement.from.value;
    selectedUnit.to = unitElement.to.value;

    convert.from();
  });
};

document.addEventListener("DOMContentLoaded", main);
