const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(process.cwd(), "db.json");

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COLS = 15;

function isNormalSeat(row, col) {
  const outerRows = new Set(["A", "B", "I", "J"]);
  const outerCols = new Set([1, 2, 14, 15]);
  return outerRows.has(row) || outerCols.has(col);
}

function genSeatsForScreen(screenId, startId) {
  const seats = [];
  let id = startId;

  for (const row of ROWS) {
    for (let col = 1; col <= COLS; col++) {
      const code = `${row}${col}`;
      const type = isNormalSeat(row, col) ? "normal" : "vip";

      seats.push({
        id,
        screenId,
        code,
        row,
        col,
        type
      });

      id++;
    }
  }
  return seats;
}

function main() {
  if (!fs.existsSync(DB_PATH)) {
    console.error("❌ Không tìm thấy db.json ở thư mục gốc");
    process.exit(1);
  }

  const raw = fs.readFileSync(DB_PATH, "utf8");
  const db = JSON.parse(raw);

  const seatsRoom1 = genSeatsForScreen(1, 1000);
  const seatsRoom2 = genSeatsForScreen(2, 2000);

  db.seats = [...seatsRoom1, ...seatsRoom2];

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  console.log("✅ Đã tạo", db.seats.length, "ghế (300 ghế)");
}

main();
