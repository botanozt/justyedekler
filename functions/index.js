const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Toplam istatistikler
exports.getStatistics = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersSnap = await db.collection("users").get();
      const carSnap = await db.collection("carListings").get();
      const houseSnap = await db.collection("houseListings").get();
      const dormSnap = await db.collection("dormListings").get();

      res.status(200).json({
        totalUsers: usersSnap.size,
        totalCars: carSnap.size,
        totalHouses: houseSnap.size,
        totalDorms: dormSnap.size,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Tüm kullanıcılar
exports.getAllUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await db.collection("users").get();
      const users = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Tüm araba ilanları
exports.getAllCarListings = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await db.collection("carListings").get();
      const cars = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Tüm ev ilanları
exports.getAllHouseListings = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await db.collection("houseListings").get();
      const houses = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(houses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// Tüm yurt ilanları
exports.getAllDormListings = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await db.collection("dormListings").get();
      const dorms = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(dorms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});