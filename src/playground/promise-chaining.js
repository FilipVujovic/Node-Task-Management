require("../db/mongoose");

const User = require("../db/models/user");

// User.findByIdAndDelete("61ad37237057c13b77b612a4")
//   .then((res) => {
//     console.log(res);
//     return User.countDocuments({ age: 0 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("61af710fc54983a77fc5f6ef", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });
