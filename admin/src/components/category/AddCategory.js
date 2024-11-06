import React, { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { TextField, Button, Stack, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../state/departmentSlice";
import bkgImg from "../../assets/images/doc.png";
import { closeSuccessDialog } from "../../state/dialogSlice";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const dispatch = useDispatch();
  const { successDialog } = useSelector((store) => store.dialog);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch, successDialog]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const theme = useTheme();
  const classes = useStyles();

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  async function createCategory(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("imageUrl", imageFile);
    const data = {
      name: "Category Name",
      description: "Category Description",
      imageUrl: imageFile,
    };
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/category/`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result.data);
      setName("");
      setDescription("");
      setImageFile(null);
      dispatch(closeSuccessDialog());
      toast.success("Category added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving category data");
      console.log(error.response.data);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        fullScreen
        open={successDialog}
        onClose={() => dispatch(closeSuccessDialog())}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => dispatch(closeSuccessDialog())}
              aria-label="close"
              sx={{ color: "#f1f1f1" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: "#f1f1f1" }} variant="h6">
              Add a Category
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            backgroundColor: "#f1f1f1",
            padding: "2rem",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={createCategory}
            style={{ margin: "0 auto", maxWidth: "500px" }}
          >
            <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
            </Stack>
            <input
              accept="image/*"
              type="file"
              name="imageUrl"
              className={classes.input}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Selected Image"
                width="50"
                height="50"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            )}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Add Category
              </Button>
            )}
          </form>
        </div>
      </Dialog>
    </ThemeProvider>
  );
}
