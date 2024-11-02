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
import {
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../state/departmentSlice";
import bkgImg from "../../assets/images/doc.png";
import { closeSuccessDialog } from "../../state/dialogSlice";
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
  const { departments, isLoading, error } = useSelector(
    (store) => store.departments
  );
  const { successDialog } = useSelector((store) => store.dialog);
  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch, successDialog]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    avatar: "",
  });

  const theme = useTheme();

  async function createCategory(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    const data =  {
      name: name,
      description: description
    }
    console.log("formData", data);
    try {
      const result = await axios.post( `${process.env.REACT_APP_BACKEND_API_URL}/api/category/`, data);
      console.log(result.data);
      setName("");
      setDescription("");
      alert("A Category added Successfully!");
      dispatch(closeSuccessDialog());
    } catch (error) {
      console.error(error);
      alert("Error saving a Category data");
    } finally {
      setLoading(false);
    }
  }

  const handleProfilePicture = (event) => {
    setAvatar(event.target.files[0]);
  };
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
            <Typography
              sx={{ ml: 2, flex: 1, color: "#f1f1f1" }}
              variant="h6"
              component="div"
            >
              Add a Doctor
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            backgroundColor: "#f1f1f1",
            width: "100%",
            borderRadius: ".4rem",
            display: "flex",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          <section
            className="left_side"
            style={{
              backgroundColor: "#f1f1f1",
              flex: 2.5,
              backgroundImage: `url(${bkgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></section>
          <form
            onSubmit={createCategory}
            style={{
              margin: "0 auto",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              padding: "0 2rem",
            }}
          >
            <center>
              <h2 style={{ color: "#159eec" }}>Doctor's Registration Form</h2>
            </center>
            <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
              <TextField
                type="text"
                variant="outlined"
                label="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                fullWidth
                error={Boolean(errors.name)} // Boolean check to determine if there's an error
                helperText={errors.name} // Display the error message
              />
              <TextField
                type="text"
                variant="outlined"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                fullWidth
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
            </Stack>
            <div>
              {loading ? (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Button
                    sx={{
                      width: "450px",
                      mb: 4,
                      backgroundColor: "#159eec",
                      color: "#fff",
                      padding: ".5rem",
                      "&:hover": { backgroundColor: "#127abb" },
                    }}
                    variant="outlined"
                    type="submit"
                  >
                    Add
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      </Dialog>
    </ThemeProvider>
  );
}
