import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fir-callan.firebaseapp.com",
  projectId: "fir-callan",
  storageBucket: "fir-callan.appspot.com",
  messagingSenderId: "877053598324",
  appId: "1:877053598324:web:a5e5c103ceb3d2a4790f21",
  measurementId: "G-QSYHEFL1WT",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const englishColRef = collection(db, "teachers");
const supportColRef = collection(db, "support_teachers");
const arabicColRef = collection(db, "arabic_lang");

const englishTeacherContainer = document.getElementById(
  "englishTeacherContainer"
);
const supportTeacherContainer = document.getElementById(
  "supportTeacherContainer"
);
const arabicTeacherContainer = document.getElementById(
  "arabicTeacherContainer"
);

const storage = getStorage();

// load image from storage
async function loadImageFromStorage(imagePath) {
  const imageRef = ref(storage, imagePath);

  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Image error:", error.message);
    return null;
  }
}

function loadEnglishTeachers() {
  getDocs(englishColRef)
    .then(async (querySnapshot) => {
      for (const doc of querySnapshot.docs) {
        const teacher = doc.data();
        const imagePath = teacher.imageRef;

        //create element
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("teachercard");
        cardDiv.id = doc.id;

        const imageUrl = await loadImageFromStorage(imagePath);
        const imageSrc = imageUrl ? imageUrl : "../assets/teacher1.jpg";

        // append image
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("teacher_img");
        const image = document.createElement("img");
        image.src = imageSrc;
        image.alt = "teacher image";
        imageDiv.appendChild(image);

        // append name
        const nameElement = document.createElement("h1");
        nameElement.classList.add("teacher_name");
        nameElement.textContent = teacher.name;

        // append other
        const scoreElement = document.createElement("p");
        scoreElement.classList.add("score");
        scoreElement.innerHTML = `Sertifikat: <span>${teacher.band}</span>`;

        const buttonElement = document.createElement("button");
        buttonElement.classList.add("more_btn");
        buttonElement.innerHTML = `haqida`;

        // Append to the cardDiv
        cardDiv.appendChild(imageDiv);
        cardDiv.appendChild(nameElement);
        cardDiv.appendChild(scoreElement);
        cardDiv.append(buttonElement);

        // Append cardDiv to the container
        englishTeacherContainer.appendChild(cardDiv);
      }
    })
    .catch((error) => {
      console.error("Error getting English teachers:", error.message);
    });
}

function loadSupportTeachers() {
  getDocs(supportColRef)
    .then(async (querySnapshot) => {
      for (const doc of querySnapshot.docs) {
        const support_teachers = doc.data();
        const imagePath = support_teachers.imageRef;

        // create  element
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("teachercard");
        cardDiv.id = doc.id;

        const imageUrl = await loadImageFromStorage(imagePath);
        const imageSrc = imageUrl ? imageUrl : "../assets/teacher1.jpg";

        // append image
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("teacher_img");
        const image = document.createElement("img");
        image.src = imageSrc;
        image.alt = "teacher image";
        imageDiv.appendChild(image);

        // append name
        const nameElement = document.createElement("h1");
        nameElement.classList.add("teacher_name");
        nameElement.textContent = support_teachers.name;

        // append other
        const scoreElement = document.createElement("p");
        scoreElement.classList.add("score");
        scoreElement.innerHTML = `Sertifikat: <span>${support_teachers.band}</span>`;

        const buttonElement = document.createElement("button");
        buttonElement.classList.add("more_btn");
        buttonElement.innerHTML = `haqida`;

        // Append to the cardDiv
        cardDiv.appendChild(imageDiv);
        cardDiv.appendChild(nameElement);
        cardDiv.appendChild(scoreElement);
        cardDiv.append(buttonElement);

        // Append cardDiv to the container
        supportTeacherContainer.appendChild(cardDiv);
      }
    })
    .catch((error) => {
      console.error("Error getting Support teachers:", error.message);
    });
}

function loadArabicTeachers() {
  getDocs(arabicColRef)
    .then(async (querySnapshot) => {
      for (const doc of querySnapshot.docs) {
        const teacher = doc.data();
        const imagePath = teacher.imgRef;

        // HTML element
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("teachercard");
        cardDiv.id = doc.id;

        const imageUrl = await loadImageFromStorage(imagePath);
        const imageSrc = imageUrl ? imageUrl : "../assets/teacher1.jpg";

        // append image
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("teacher_img");
        const image = document.createElement("img");
        image.src = imageSrc;
        image.alt = "teacher image";
        imageDiv.appendChild(image);

        // append name
        const nameElement = document.createElement("h1");
        nameElement.classList.add("teacher_name");
        nameElement.textContent = teacher.ism;

        // append other
        const scoreElement = document.createElement("p");
        scoreElement.classList.add("score");
        scoreElement.innerHTML = `Sertifikat: <span>${teacher.band}</span>`;

        const experienceElement = document.createElement("p");
        experienceElement.classList.add("experience");
        experienceElement.innerHTML = `Tajriba: <span>${teacher.tajriba}</span>`;
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("more_btn");
        buttonElement.innerHTML = `haqida`;

        // append to cardDiv
        cardDiv.appendChild(imageDiv);
        cardDiv.appendChild(nameElement);
        cardDiv.appendChild(scoreElement);
        cardDiv.appendChild(experienceElement);
        cardDiv.append(buttonElement);

        // append cardDiv to container
        arabicTeacherContainer.appendChild(cardDiv);
      }
    })
    .catch((error) => {
      console.error("Error getting Arabic teachers:", error.message);
    });
}

// Call the functions
loadEnglishTeachers();
loadArabicTeachers();
loadSupportTeachers();
