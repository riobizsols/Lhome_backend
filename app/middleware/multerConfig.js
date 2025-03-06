const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const allowedMimeTypes = [
    "application/pdf",
    "application/msword", // DOC
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "message/rfc822" // EML
];

const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only DOC, DOCX, PDF, and EML files are allowed"), false);
    }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploads;
