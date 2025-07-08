const addressModel = require("../model/address");

//add address: api/address/add

module.exports.addAddressController = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;

    const newaddress = await addressModel.create({
      userId: userId,
      ...address,
    });

    console.log(address);
    res
      .status(200)
      .json({ success: true, message: "address added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error", success: false });
  }
};

// get address : api/address/get

module.exports.getAddressController = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await addressModel.find({ userId: userId });

    res.status(200).json({ success: true, addresses });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};
