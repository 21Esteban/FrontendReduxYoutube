import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { videos } from "../fakeData.js/Data";
import axios from "axios";


//Aqui van a ir todos los estados golbales

const initialState = {
  //Este es nuestro estado pa guardar los videos que llegan del backend con el axios
  videos:[],


  filterVideos: [],
  // videos: videos,
  // filterVideos: videos,
  isEdit: false,
  videoToEdit: {},
  show: false,
  isLoading: false,
};

//Funcion para obtener nuestros datos del backend
export const getVideos = createAsyncThunk(
  "appSlice/getVideos",
  async (arg, { dispatch, getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/video`);
      dispatch(setfilterVideos(data.data))
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);


export const saveVideo = createAsyncThunk("appSlice/saveVideo", async (arg,{dispatch ,getState,rejectWithValue})=>{
  try {


    await axios.post("/video",arg) //arg son los argumentos o datos que van a recibir del formulario de este front para hacer la petion post y crear lo que recibimos de ese formulario o arg
    


    //Volvemos a llamar la funcion getVideos para que vuelva a hacer otra peticion
    dispatch(getVideos());
  } catch (error) {
    console.log(error.response.data.message)
    return rejectWithValue(error.response.data.message);
  }
})


export const deleteVideo = createAsyncThunk(
  "appSlice/deleteVideo",
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      await axios.delete(`/video/${id}`) //En este caso en ves de recibir los arg recibimos o le pedimos al user el id para hacer la peticion y eliminarlos

      dispatch(getVideos())

    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  })




  export const updateVideo = createAsyncThunk(
    "appSlice/updateVideo",
    async (arg, { dispatch, rejectWithValue }) => {
      try {
        await axios.put(`/video/${arg._id}`,arg) //En este caso como vamos a actualizar , pedimos los arg y ahi esta el id, usamos ese id para hacerle la peticion a el backend con el axios, y lo que le pedimos o nos llega del usuario(arg) lo actualizamos del video
        
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setfilterVideos(state, action) {
      state.filterVideos = action.payload;
    },

    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },

    setvideoToEdit(state, action) {
      state.videoToEdit = action.payload;
    },
    setisLoading(state, action){
      state.isLoading = action.payload
    },

    handleClose(state) {
      state.show = false;
    },
    handleShow(state) {
      state.show = true;
    },
  },

  extraReducers:(builder)=>{
    builder.addCase(getVideos.pending, (state, action) => {
      state.isLoading=true
    });

    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.isLoading=false
      state.videos = action.payload;
    });

    builder.addCase(saveVideo.fulfilled, (state, action) => {
      
      state.isLoading = false;
    });

    builder.addCase(saveVideo.pending, (state, action) => {
      
      state.isLoading = true;
    });

    builder.addCase(saveVideo.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      alert("Los campos son requeridos");
      
    });

    builder.addCase(deleteVideo.rejected, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(updateVideo.rejected, (state, action) => {
      console.log(action.payload);
    });
  }
});






export const {
  setfilterVideos,
  setIsEdit,
  setvideoToEdit,
  handleClose,
  handleShow,
} = appSlice.actions;

export default appSlice.reducer;
