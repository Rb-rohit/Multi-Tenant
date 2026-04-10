
const getData = async (req, res) => {
    let query = {};

    if (req.user.role !== "superadmin") {
        query.companyId = req.user.companyId;
    }

    const data = await Data.find(query);
    res.json(data);
};
