import type { StudentGrade } from "@/types/auth";
import type { TrialQuestion } from "./trial-types";

export const trialQuestionGeneral = [
  { question: "12 x 8 = ...", options: ["86", "96", "108", "116"], answer: "96" },
  { question: "Hasil dari 144 : 12 adalah ...", options: ["10", "12", "14", "16"], answer: "12" },
  { question: "25% dari 200 adalah ...", options: ["25", "40", "50", "75"], answer: "50" },
  { question: "Luas persegi sisi 9 cm adalah ...", options: ["18", "36", "72", "81"], answer: "81" },
  { question: "3/4 + 1/2 = ...", options: ["1/4", "5/4", "6/4", "7/4"], answer: "5/4" },
  { question: "Keliling persegi panjang 12 x 8 cm adalah ...", options: ["20", "32", "40", "96"], answer: "40" },
  { question: "Akar kuadrat dari 169 adalah ...", options: ["11", "12", "13", "14"], answer: "13" },
  { question: "Jika x + 15 = 42, nilai x adalah ...", options: ["17", "23", "27", "57"], answer: "27" },
  { question: "Median dari 6, 8, 9, 10, 12 adalah ...", options: ["8", "9", "10", "12"], answer: "9" },
  { question: "Volume kubus sisi 5 cm adalah ...", options: ["25", "75", "100", "125"], answer: "125" },
];

export const trialQuestionSD = [
  { question: "7 x 8 = ...", options: ["54", "56", "58", "64"], answer: "56" },
  { question: "450 + 275 = ...", options: ["715", "725", "735", "745"], answer: "725" },
  { question: "3/5 sama dengan ...%", options: ["40%", "50%", "60%", "80%"], answer: "60%" },
  { question: "Keliling persegi dengan sisi 15 cm adalah ...", options: ["30", "45", "60", "75"], answer: "60" },
  { question: "Hasil dari 1.200 : 30 adalah ...", options: ["20", "30", "40", "50"], answer: "40" },
  { question: "FPB dari 18 dan 24 adalah ...", options: ["4", "6", "8", "12"], answer: "6" },
  { question: "KPK dari 6 dan 8 adalah ...", options: ["12", "18", "24", "48"], answer: "24" },
  { question: "Volume kubus dengan sisi 4 cm adalah ...", options: ["16", "32", "48", "64"], answer: "64" },
  { question: "Sudut siku-siku besarnya ...", options: ["45°", "60°", "90°", "180°"], answer: "90°" },
  { question: "9² = ...", options: ["72", "81", "90", "99"], answer: "81" },
];

export const trialQuestionSMP = [
  { question: "2x + 7 = 19. Nilai x adalah ...", options: ["5", "6", "7", "8"], answer: "6" },
  { question: "Gradien garis melalui (0,0) dan (2,6) adalah ...", options: ["2", "3", "4", "6"], answer: "3" },
  { question: "Akar-akar dari x² - 9 = 0 adalah ...", options: ["±2", "±3", "±4", "3 dan 9"], answer: "±3" },
  { question: "180° - 47° = ...", options: ["123°", "127°", "133°", "137°"], answer: "133°" },
  { question: "Rata-rata 6, 8, 10, 12 adalah ...", options: ["8", "9", "10", "11"], answer: "9" },
  { question: "Luas lingkaran dengan r = 7 cm (π=22/7) adalah ...", options: ["144", "154", "164", "174"], answer: "154" },
  { question: "15% dari 320 adalah ...", options: ["36", "42", "48", "52"], answer: "48" },
  { question: "Bentuk sederhana 18/24 adalah ...", options: ["2/3", "3/4", "4/5", "5/6"], answer: "3/4" },
  { question: "Jika y = 4x dan x = 5, maka y = ...", options: ["15", "20", "25", "40"], answer: "20" },
  { question: "Peluang muncul angka pada sebuah koin adalah ...", options: ["1/4", "1/3", "1/2", "1"], answer: "1/2" },
];

export const trialQuestionSMA = [
  { question: "Turunan dari x² adalah ...", options: ["x", "2x", "x²", "2"], answer: "2x" },
  { question: "Nilai sin 30° adalah ...", options: ["1/2", "√2/2", "√3/2", "1"], answer: "1/2" },
  { question: "log₁₀ 100 = ...", options: ["1", "2", "10", "100"], answer: "2" },
  { question: "Limit x→2 dari (x²-4)/(x-2) adalah ...", options: ["2", "4", "6", "Tak hingga"], answer: "4" },
  { question: "Integral ∫2x dx adalah ...", options: ["x² + C", "2x + C", "x + C", "2 + C"], answer: "x² + C" },
  { question: "Median data 2,4,6,8,10 adalah ...", options: ["4", "5", "6", "7"], answer: "6" },
  { question: "Determinan matriks [[1,2],[3,4]] adalah ...", options: ["-2", "2", "10", "12"], answer: "-2" },
  { question: "Nilai cos 60° adalah ...", options: ["0", "1/2", "√2/2", "1"], answer: "1/2" },
  { question: "2³ × 2² = ...", options: ["16", "32", "64", "128"], answer: "32" },
  { question: "Persamaan x + 5 = 12 memiliki solusi ...", options: ["5", "6", "7", "8"], answer: "7" },
];

export const trialQuestionSMK = [
  { question: "Diskon 20% dari Rp250.000 adalah ...", options: ["Rp40.000", "Rp45.000", "Rp50.000", "Rp60.000"], answer: "Rp50.000" },
  { question: "Keuntungan = Harga Jual - ...", options: ["Diskon", "Modal", "Pajak", "Ongkir"], answer: "Modal" },
  { question: "2x - 8 = 12, maka x = ...", options: ["8", "9", "10", "12"], answer: "10" },
  { question: "Rasio 15 : 25 dalam bentuk sederhana adalah ...", options: ["2:5", "3:5", "4:5", "5:6"], answer: "3:5" },
  { question: "Pajak 11% dari Rp100.000 adalah ...", options: ["Rp10.000", "Rp11.000", "Rp12.000", "Rp15.000"], answer: "Rp11.000" },
  { question: "20% = ...", options: ["1/3", "1/4", "1/5", "1/6"], answer: "1/5" },
  { question: "Jika 5 barang seharga Rp250.000, maka harga 1 barang adalah ...", options: ["Rp40.000", "Rp45.000", "Rp50.000", "Rp55.000"], answer: "Rp50.000" },
  { question: "Luas persegi panjang 20 × 8 adalah ...", options: ["120", "140", "160", "180"], answer: "160" },
  { question: "Persentase 0,75 adalah ...", options: ["25%", "50%", "75%", "80%"], answer: "75%" },
  { question: "Hasil 18 × 12 adalah ...", options: ["196", "206", "216", "226"], answer: "216" },
];

const trialByGrade = {
  SD: trialQuestionSD,
  SMP: trialQuestionSMP,
  SMA: trialQuestionSMA,
  SMK: trialQuestionSMK,
};

export function getTrialQuestionsByGrade(grade: StudentGrade | null) {
  return mapLocalQuestions(grade ? trialByGrade[grade] : trialQuestionGeneral);
}

type LocalQuestion = {
  question: string;
  options: string[];
  answer: string;
};

function mapLocalQuestions(items: LocalQuestion[]): TrialQuestion[] {
  return items.map((item, questionIndex) => {
    const options = item.options.map((option, optionIndex) => ({
      id: `local-${questionIndex}-${optionIndex}`,
      label: String.fromCharCode(65 + optionIndex),
      text: option,
    }));

    return {
      id: `local-${questionIndex}`,
      question: item.question,
      options,
      answerId: options.find((option) => option.text === item.answer)?.id,
    };
  });
}
