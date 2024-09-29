import express from "express";
const app = express();
const port = 3000;

app.get("/gdsc", (req, res) => {
    res.send("Google Developer Student Clubs (GDSC) has now transitioned to Google Developer Groups (GDG) on campus. This rebranding reflects a broader focus, expanding from student-oriented activities to a more inclusive developer community. GDG on campus will continue to offer learning, collaboration, and networking opportunities for students, developers, and tech enthusiasts alike.");
});

app.get("/mmdu", (req, res) => {
    res.send("Maharishi Markandeshwar (Deemed to be University), Mullana, is a prestigious educational institution known for its diverse academic programs and excellence in research and innovation. Offering courses across various disciplines, MMDU provides a holistic learning environment with state-of-the-art facilities, fostering professional growth and personal development for students worldwide.");
});

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});
