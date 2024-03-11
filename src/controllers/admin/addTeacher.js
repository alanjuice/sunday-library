const pool = require("../../database/pool");

//TODO: autogenerate teacher id like T001
async function addTeacher(req, res) {
  try {
    const { id, name, mno, classname, password } = req.body;
    // const id = req.body.id;
    // const name = req.body.name;
    // const mno = req.body.mno;
    // const classname = req.body.classname;
    // const password = req.body.password;

    if (!id || !name || !mno || !classname || !password) {
      res.status(400).json({ status: false, msg: "missing fields" });
      return;
    }

    //check if teacher already exists or not
    const exists = await pool.query("select * from teachers where id=$1", [id]);
    if (exists.rowCount != 0) {
      res.status(400).json({ status: false, msg: "teacher already exists" });
      return;
    }

    //Encrypting password
    //TODO: better salt setup
    const salt = await bcrypt.genSalt(4);
    const encryptedPassword = await bcrypt.hash(password, salt);
    
    const result = await pool.query(
      "INSERT INTO teachers VALUES($1,$2,$3,$4,$5)",
      [id, name, mno, classname, encryptedPassword]
    );
    res.status(200).json({ status: true, msg: "teacher added" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, msg: "Something went wrong" });
  }
}

module.exports = addTeacher;
