import { v4 as uuidv4 } from "uuid";
const fs = require("fs");

interface Student {
  name: string;
}

export interface CustomError extends Error {
  message: string;
  error: any;
}

class SaveStudentService {
  addStudentToDb = async (filename: string, data: Student) => {
    try {
      const fileContent = await fs.promises.readFile(filename, "utf-8");
      const json = JSON.parse(fileContent);

      const dataWithId = { id: uuidv4(), ...data };
      json.push(dataWithId);

      await fs.promises.writeFile(filename, JSON.stringify(json, null, 2));
      return { message: `Student ${data.name} added successfully` };
    } catch (err) {
      throw {
        message: `Error while adding student`,
        error: err,
      } as CustomError;
    }
  };

  getStudents = async (filename: string) => {
    try {
      const contentFile = await fs.promises.readFile(filename, "utf-8");
      return JSON.parse(contentFile);
    } catch (error) {
      throw error
    }
  };
}

export default SaveStudentService;
