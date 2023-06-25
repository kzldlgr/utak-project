export const filterName = (user) => {
  let name = user.split('@')[0]
  return name.replace(name.charAt(), name.charAt().toUpperCase());
}

export const generateCategory = () => {
  const min = 10000;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const prefixedNumber = "C" + randomNumber.toString();
  return prefixedNumber;
}

export const generateSku = () => {
  const min = 10000;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const prefixedNumber = "N" + randomNumber.toString();
  return prefixedNumber;
}

export const sortArray = (array) => {
  return array.sort(function (a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}

export const validate = (values) => {
  const errors = {};
  const namePattern = /^[A-Za-z\s]+$/; 
  const amountPattern = /^\d+(\.\d{1,2})?$/;
  const stockPattern = /^\d+$/;
  if (!values.name) {
    errors.name = "Item name is required";
  } else if (!namePattern.test(values.name)) {
    errors.name = "Invalid item name";
  }

  if (!values.cost) {
    errors.cost = "Item cost is required";
  } else if (!amountPattern.test(values.cost)) {
    errors.cost = "Invalid item cost";
  }
  
  if (!values.price) {
    errors.price = "Item price is required";
  } else if (!amountPattern.test(values.price)) {
    errors.price = "Invalid item price";
  }
  
  if (!values.stock) {
    errors.stock = "Stock is required";
  } else if (!stockPattern.test(values.stock)) {
    errors.stock = "Invalid stock";
  }

  return errors
}