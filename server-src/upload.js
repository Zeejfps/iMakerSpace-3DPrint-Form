import IncomingForm from "formidable";

module.exports = function upload(req, res) {
    const form = IncomingForm();

    form.on("file", (field, file) => {
        console.log(file);
    });

    form.on("end", () => {
        res.json();
    });

    form.parse(req);
};