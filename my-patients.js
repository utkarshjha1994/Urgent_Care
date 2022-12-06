import { getpatientsRequest } from "./APIManager.js";

getpatientsRequest()
  .then((result) => {
    if (result.success === 1) {
      console.log(result);
    } else {
      alert(result.message);
    }
  })
  .catch((error) => {
    alert(error);
  });
