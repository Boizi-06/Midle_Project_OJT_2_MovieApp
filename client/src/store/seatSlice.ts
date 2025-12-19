import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Khai báo kiểu dữ l11111 
export type SeatType = "normal" | "vip";

export type Seat = {
  id: number;
  screenId: number;
  code: string; // "A1"
  row: string;  // "A"
  col: number;  // 1..15
  type: SeatType;
};

export type Showtime = {
  id: number;
  movieId: number;
  screenId: number;
  date: string;
  startTime: string;
  endTime: string;
  format?: string;
  pricing: {
    normal: number;
    vip: number;
  };
  reservedSeatCodes: string[]; // ["A1","B2"]
};

export type Movie = {
  id: number;
  title: string;
  poster: string;
  trailer: string;
  description: string;
  duration: number;
  releaseDate: string;
  status: string;
  genreIds: number[];
  director: string;
  actors: string[];
};

type SeatState = {
  seats: Seat[];
  showtimes: Showtime[];
  selectedSeats: string[];
  bookedSeats: string[];
  selectedShowtime: Showtime | null;
  totalPrice: number;
  movie: Movie | null;  // Thêm thông tin phim
  loadingSeats: boolean;
  loadingShowtime: boolean;
  loadingMovie: boolean;  // Trạng thái loading phim
  error: string | null;
};

const initialState: SeatState = {
  seats: [],
  showtimes: [],
  selectedSeats: [],
  bookedSeats: [],
  selectedShowtime: null,
  totalPrice: 0,
  movie: null,  // Khởi tạo là null
  loadingSeats: false,
  loadingShowtime: false,
  loadingMovie: false,  // Trạng thái loading phim
  error: null,
};

const api = axios.create({
  baseURL: "http://localhost:8080", // Cập nhật baseURL của API
});

// ========== THUNKS ==========
// Fetch thông tin ghế
export const fetchSeatsByScreen = createAsyncThunk<Seat[], { screenId: number }>(
  "seat/fetchSeatsByScreen",
  async ({ screenId }) => {
    const res = await api.get<Seat[]>("/seats", { params: { screenId } });
    return res.data;
  }
);

// Fetch thông tin phim theo ID
export const fetchMovieById = createAsyncThunk<Movie, number>(
  "seat/fetchMovieById",
  async (movieId) => {
    const res = await api.get<Movie>(`/movies/${movieId}`);
    return res.data;
  }
);

// Fetch danh sách suất chiếu theo phim
export const fetchShowtimesByMovie = createAsyncThunk<Showtime[], { movieId: number; screenId: number; date: string }>(
  "seat/fetchShowtimesByMovie",
  async ({ movieId, screenId, date }) => {
    const res = await api.get<Showtime[]>("/showtimes", {
      params: { movieId, screenId, date },
    });
    return res.data;
  }
);

// Fetch suất chiếu theo giờ cụ thể
export const fetchShowtime = createAsyncThunk<Showtime, { movieId: number; screenId: number; date: string; startTime: string }>(
  "seat/fetchShowtime",
  async ({ movieId, screenId, date, startTime }) => {
    const res = await api.get<Showtime[]>("/showtimes", {
      params: { movieId, screenId, date, startTime },
    });

    const showtime = res.data?.[0];
    if (!showtime) throw new Error("Không tìm thấy suất chiếu phù hợp!");
    return showtime;
  }
);

// Helper tính tổng tiền
function calcTotalPrice(seatCodes: string[], seats: Seat[], showtime: Showtime | null) {
  if (!showtime) return 0;
  const map = new Map(seats.map((s) => [s.code, s.type]));
  return seatCodes.reduce((sum, code) => {
    const type = map.get(code);
    if (!type) return sum;
    return sum + (showtime.pricing[type] ?? 0);
  }, 0);
}
// Thực hiện đặt vé và cập nhật showtime
// Thực hiện tạo booking và gửi thông tin vào API
export const createBooking = createAsyncThunk(
  'seat/createBooking',
  async (bookingData: { userId: number; showtimeId: number; seatCodes: string[]; totalPrice: number;status:string;createdAt:string }, { rejectWithValue }) => {
    try {
      // Tạo booking
      const response = await api.post('/bookings', bookingData); // POST thông tin booking

      // Cập nhật showtime với reservedSeatCodes mới
      const showtimeResponse = await api.get(`/showtimes/${bookingData.showtimeId}`);
      const showtime = showtimeResponse.data;

      // Kết hợp ghế mới vào danh sách ghế đã đặt
      const updatedReservedSeats = [...new Set([...showtime.reservedSeatCodes, ...bookingData.seatCodes])];

      // Cập nhật showtime với reservedSeatCodes mới
      await api.patch(`/showtimes/${bookingData.showtimeId}`, {
        reservedSeatCodes: updatedReservedSeats,
      });

      // Tạo đối tượng trả về, đồng bộ với mẫu
      const newData = {
        id: response.data.id, // Nếu response từ API đã trả về id, dùng nó
        userId: bookingData.userId,
        showtimeId: bookingData.showtimeId,
        seatCodes: bookingData.seatCodes,
        totalPrice: bookingData.totalPrice,
        status: "pending", // Đặt giá trị mặc định là "pending"
        createdAt: new Date().toISOString(), // Tạo thời gian hiện tại làm giá trị createdAt
      };

      console.log('booking moi',newData);  // Kiểm tra xem newData đã đúng chưa

      // Gửi lại dữ liệu booking mới
      return newData;  
    } catch (error) {
      return rejectWithValue(error.response.data);  // Nếu lỗi, trả lại lỗi
    }
  }
);




// Thunk để lấy danh sách ghế đã đặt cho suất chiếu
export const fetchBookedSeats = createAsyncThunk(
  'seat/fetchBookedSeats',
  async (showtimeId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/showtimes/${showtimeId}`); // Lấy thông tin showtime
      return response.data.reservedSeatCodes;  // Lấy danh sách ghế đã đặt từ reservedSeatCodes của showtime
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);






const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    // Chọn ghế
    selectSeat: (state, action: PayloadAction<string>) => {
      const seatCode = action.payload;

      // Kiểm tra nếu ghế đã được đặt
      if (state.bookedSeats.includes(seatCode)) {
        console.log(`Ghế ${seatCode} đã được đặt!`);
        return;
      }

      // Kiểm tra nếu ghế đã được chọn rồi
      if (state.selectedSeats.includes(seatCode)) {
        // Bỏ chọn ghế nếu đã chọn
        state.selectedSeats = state.selectedSeats.filter((s) => s !== seatCode);
        console.log('bỏ chọn',seatCode);
        
      } else {
        // Thêm ghế vào selectedSeats nếu chưa chọn
        state.selectedSeats.push(seatCode);
        console.log('đã chọn',seatCode);
      }

      // Đảm bảo selectedSeats là mảng thông thường
      state.selectedSeats = [...state.selectedSeats]; // Spread để tạo bản sao

      // Tính lại tổng tiền
      state.totalPrice = calcTotalPrice(state.selectedSeats, state.seats, state.selectedShowtime);

      // Log để kiểm tra
      console.log("Số Ghế đã chọn: ", state.selectedSeats);
      console.log("Tổng tiền: ", state.totalPrice);
    },

    // Xóa ghế đã chọn
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Đặt ghế
    setBookedSeats: (state, action: PayloadAction<string[]>) => {
      state.bookedSeats = Array.from(new Set([...state.bookedSeats, ...action.payload]));
      state.selectedSeats = [];
      state.totalPrice = 0;
    },
  },

  extraReducers: (builder) => {
    // Fetch thông tin phim
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loadingMovie = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loadingMovie = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loadingMovie = false;
        state.error = action.error.message || "Lỗi tải phim";
      })

      // Fetch ghế
      .addCase(fetchSeatsByScreen.pending, (state) => {
        state.loadingSeats = true;
        state.error = null;
      })
      .addCase(fetchSeatsByScreen.fulfilled, (state, action) => {
        state.loadingSeats = false;
        state.seats = action.payload;
        state.totalPrice = calcTotalPrice(state.selectedSeats, state.seats, state.selectedShowtime);
      })
      .addCase(fetchSeatsByScreen.rejected, (state, action) => {
        state.loadingSeats = false;
        state.error = action.error.message || "Lỗi tải ghế";
      })

      // Fetch suất chiếu
      .addCase(fetchShowtime.pending, (state) => {
        state.loadingShowtime = true;
        state.error = null;
      })
      .addCase(fetchShowtime.fulfilled, (state, action) => {
        state.selectedShowtime = action.payload;
        state.bookedSeats = action.payload.reservedSeatCodes || [];

        // Reset ghế đã chọn khi chuyển suất chiếu
        state.selectedSeats = [];
        state.totalPrice = 0;
      })
      .addCase(fetchShowtime.rejected, (state, action) => {
        state.loadingShowtime = false;
        state.error = action.error.message || "Lỗi tải suất chiếu";
      })

      // Fetch danh sách suất chiếu theo phim
      .addCase(fetchShowtimesByMovie.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchShowtimesByMovie.fulfilled, (state, action) => {
        state.showtimes = action.payload;
      })
      .addCase(fetchShowtimesByMovie.rejected, (state, action) => {
        state.error = action.error.message || "Lỗi tải danh sách suất chiếu";
      })
       .addCase(fetchBookedSeats.fulfilled, (state, action) => {
        state.bookedSeats = action.payload;  // Cập nhật ghế đã đặt vào state
      });
  },
});

export const { selectSeat, clearSelectedSeats, setBookedSeats } = seatSlice.actions;
export const seatReducer = seatSlice.reducer;
