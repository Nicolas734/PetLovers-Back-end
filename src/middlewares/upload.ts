import multer from "multer";
import * as dotenv from "dotenv";



dotenv.config();

const DIR = 'uploads/';
// const SEND_TO_DRIVE = process.env.SEND_TO_DRIVE || false;

const storage = {
    local: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIR)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.jpg');
        }
    }),
    drive: multer.memoryStorage()
}

const uploadLocal = multer({storage:storage.local});
const uploadDrive = multer({storage:storage.drive});
// const upload = multer({storage: SEND_TO_DRIVE ? storage.drive : storage.local});

export { uploadLocal, uploadDrive };