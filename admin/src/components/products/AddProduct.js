import React, { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeSuccessDialog } from "../../state/dialogSlice";
import { getAllCategories } from "../../state/categorySlice";
import {
  TextField,
  Button,
  Stack,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";

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
  const { categories, isLoading, error } = useSelector(
    (store) => store.categories
  );
  const { successDialog } = useSelector((store) => store.dialog);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, successDialog]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrls: "",
  });

  const theme = useTheme();
  const classes = useStyles();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImageUrls(files);
  };

  async function addProduct(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    imageUrls.forEach((file) => formData.append("imageUrls", file));

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/products`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(result.data);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImageUrls([]);
      alert("Product added successfully!");
      dispatch(closeSuccessDialog());
    } catch (error) {
      console.error(error);
      alert("Error saving product data");
    } finally {
      setLoading(false);
    }
  }

  return (
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
            Add a Product
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          backgroundColor: "#f1f1f1",
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <form
          onSubmit={addProduct}
          style={{
            maxWidth: "500px",
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <center>
            <h2 style={{ color: "#159eec" }}>Product Registration Form</h2>
          </center>
          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                error={Boolean(errors.category)}
                helperText={errors.category}
              >
                {categories.map((row, index) => (
                  <MenuItem key={row._id} value={row.name}>
                    {row.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "#f44336" }}>
                {errors.category}
              </FormHelperText>
            </FormControl>
          </Stack>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              type="number"
              error={Boolean(errors.price)}
              helperText={errors.price}
            />
            <TextField
              label="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              fullWidth
              type="number"
              error={Boolean(errors.stock)}
              helperText={errors.stock}
            />
          </Stack>
          <input
            accept="image/*"
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className={classes.input}
            id="upload-images"
          />
          <label htmlFor="upload-images">
            <Button variant="contained" component="span">
              Upload Images
            </Button>
          </label>
          <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
            {imageUrls.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Selected"
                width="50"
                height="50"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            ))}
          </Stack>
          <div style={{ marginTop: "1rem" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#159eec",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#127abb" },
                }}
              >
                Add Product
              </Button>
            )}
          </div>
        </form>
      </div>
    </Dialog>
  );
}
