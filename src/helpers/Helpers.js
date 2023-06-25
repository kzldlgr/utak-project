export const filterName = (user) => {
  let name = user.split('@')[0]
  return name.replace(name.charAt(), name.charAt().toUpperCase());
}

export const generateSku = () => {
  const min = 10000;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const prefixedNumber = "N" + randomNumber.toString();
  return prefixedNumber;
}

export const sortArray = (array) => {
  return array.sort(function(a, b) {
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