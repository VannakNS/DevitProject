const { db, removeF } = require("../util/helper");
const { logError } = require("../util/logerror");

exports.getlist = async (req, res) => {
  try {
    var sql = "SELECT * FROM home";
    const [data] = await db.query(sql);
    res.json({
      message: "get list done",
      data: data,
    });
  } catch (error) {
    logError("getlist.home", error, res);
  }
};

exports.create = async (req, res) => {
  try {
    var sql =
      "INSERT INTO home (image, subtitle, date, is_active, description, create_by) VALUES (:image, :subtitle, :date, :is_active, :description, 'nake')";
    const [data] = await db.query(sql, {
      ...req.body,
      image: req.file?.filename,
    });
    res.json({
      message: "Create done",
      data: data,
    });
  } catch (error) {
    logError("create.home", error, res);
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

    var sql =
      "UPDATE home SET image =:image, subtitle = :subtitle, date = :date, is_active = :is_active, description = :description, create_by = :create_by WHERE id = :id";
    const [data] = await db.query(sql, {
      id: req.body.id,
      image: filename,
      ...req.body,
    });

    res.json({
      message: "update done",
      data: data,
    });
  } catch (error) {
    logError("update.home", error, res);
  }
};

exports.remove = async (req, res) => {
  try {
    var sql = "DELETE  FROM home WHERE id=:id";
    const [data] = await db.query(sql, { id: req.params.id });

    res.json({
      message: "delete done",
      data: data,
    });
  } catch (error) {
    logError("remove.home", error, res);
  }
};
