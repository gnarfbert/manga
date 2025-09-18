import express from "express";
import cors from "cors";
import { db } from "./FirebaseInit.js";
import { collection, doc, addDoc, getDoc, setDoc} from "firebase/firestore";

const app = express();
const port = 8080;
app.use(cors({
  origin: [/^http:\/\/localhost:5173$/, /^http:\/\/127\.0\.0\.1:5173$/],
}));
app.use(express.json());


app.post("/reviews", async (req, res) => {
    const {id, userComment} = req.body;
    const userReview = doc(db, "mangaComments", String(id));
    try {
        await setDoc(userReview, {userComment});
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add review" });
    }
});

app.get("/reviews/:id", async (req, res) => {
    const id = String(req.params.id)
    const snap = await getDoc(doc(db, "mangaComments", id));
    if(!snap.exists()) {
        return res.status(404).json({error: "Not found"})
    }
    res.json(snap.data());
})


// async function addMangaToCollection(title, author, genre) {
//     try {
//         const docRef = await addDoc(collection(db, "manga"), {
//             title: title,
//             author: author,
//             genre: genre,
//             createdAt: new Date() // You can add timestamps!
//         });
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }

function start() {
    app.listen(port, () => {
        console.log(`working`)
    })
}

start()