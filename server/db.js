const mongoose =require("mongoose");
require("dotenv").config()
const DATABASE=process.env.DATABASEURL
const url=DATABASE

const Internship = require("./Model/Internship");
const Job = require("./Model/Jobs");
const internshipSeedData = require("./Data/InternshipDatAvl");
const jobSeedData = require("./Data/JobsDataAvl");

const seedIfEmpty = async () => {
      const [internshipCount, jobCount] = await Promise.all([
            Internship.countDocuments(),
            Job.countDocuments(),
      ]);

      if (internshipCount === 0) {
            await Internship.insertMany(internshipSeedData);
            console.log(`Seeded internships: ${internshipSeedData.length}`);
      }

      if (jobCount === 0) {
            await Job.insertMany(jobSeedData);
            console.log(`Seeded jobs: ${jobSeedData.length}`);
      }
}

module.exports.connect=async()=>{
      try {
            await mongoose.connect(url);
            console.log("DataBase is Connected");
            await seedIfEmpty();
      } catch (error) {
            console.error("Database connection failed:", error.message);
      }
}