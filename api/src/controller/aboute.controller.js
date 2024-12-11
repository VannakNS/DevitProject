const { db, removeF } = require("../util/helper");
const { logError } = require("../util/logerror");

exports.getlist = async (req, res) => {
  try {
    var sql = "SELECT * FROM about";
    const [data] = await db.query(sql);
    res.json({
      message: "get list done",
      data: data,
    });
  } catch (error) {
    logError("getlist.aboute", error, res);
  }
};

exports.create = async (req, res) => {
  try {
    var sql = "INSERT INTO about (image) VALUES (:image)";
    const [data] = await db.query(sql, { image: req.file?.filename });
    res.json({
      message: "Create done",
      data: data,
    });
  } catch (error) {
    logError("create.aboute", error, res);
  }
};

exports.update = async (req, res) => {
  try {
    var filename = req.body.Image1;

    if (
      (req.body.Image1 == null ||
        req.body.Image1 == "" ||
        req.body.Image1 == undefined ||
        req.body.Image1 == "undefined") &&
      req.file
    ) {
      filename = req.file?.filename; // Add new image
    }

    // Replace the image if an existing image is provided and a new file exists
    if (
      (req.body.Image1 != null ||
        req.body.Image1 != "null" ||
        req.body.Image1 != "" ||
        req.body.Image1 != undefined ||
        req.body.Image1 != "undefined") &&
      req.file
    ) {
      await removeF(req.body.Image1); // Remove old image
      filename = req.file?.filename; // Add new image
    }

    // Remove the image if explicitly marked for removal
    if (req.body.Image_rm == "1") {
      await removeF(req.body.Image1); // Remove old image
      filename = null; // Clear filename
    }
    var sql = "UPDATE about SET image=:image";
    const [data] = await db.query(sql, { id: req.body.id, image: filename });

    res.json({
      message: "update done",
      data: data,
    });
  } catch (error) {
    logError("update.aboute", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    var sql = "DELETE  FROM about WHERE id=:id";
    const [data] = await db.query(sql, { id: req.params.id });

    res.json({
      message: "delete done",
      data: data,
    });
  } catch (error) {
    logError("remove.aboute", error, res);
  }
};
